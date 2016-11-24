const express = require('express');
const multer = require('multer');
const fs = require('fs');
const iu = require('../utils/image-utils');
const {errors, sendError} = require('./errors');

const {CREATED} = require('http-status-codes');

const {
	REQUEST_TOO_LONG,
	UNKNOWN_ERROR,
	NO_FILE,
	UNSUPPORTED_FILE
} = errors;

/**
 * Returns middleware that uploads and validates the file
 * for album. Config object is passed directly to multer. Refer
 * multer's docs for details.
 * https://github.com/expressjs/multer#multeropts
 *
 * @param conf - configuration object
 */
module.exports = (conf) => {
	const upload = multer(conf).single(conf.fieldName);

	return (req, res) => {
		upload(req, res, onUploadCompleted(req, res));
	};
};

/**
 * Validation of uploaded content
 */
const onUploadCompleted = (req, res) => {
	return (err) => {

		const file = req.file;
		const appErr = validateUpload(err) || validateFile(file);

		if (appErr) {
			sendError(res, appErr);
			return;
		}

		moveToDestination(file, (err, path) => {
			res.location(path);
			res.status(CREATED).json({path});
		});
	}
};

/**
 * Checks the upload error and transforms to app-specific
 * error if any. Returns null if no error.
 */
const validateUpload = (err) => {
	if (!err) {
		return null;
	}

	if (err.code === 'LIMIT_FILE_SIZE') {
		return REQUEST_TOO_LONG;
	} else {
		return UNKNOWN_ERROR;
	}
};

/**
 * Validates the uploaded file. This implementation provides two
 * naive checks: if file was uploaded at all and if mime type is
 * image. For production use, would be good to check if this
 * file is an actual image. For example, using image-size to
 * get the dimensions.
 *
 * Any additional restrictions like width/height of the image
 * should also be implemented here.
 */
const validateFile = (file) => {
	if (!file) {
		return NO_FILE;
	}

	if (!iu.isImageMime(file.mimetype)) {
		return UNSUPPORTED_FILE;
	}

	return null;
};

/**
 * Renames the file, adding the extension to auto-generated
 * random name.
 */
const moveToDestination = (file, cb) => {
	const ext = iu.getExtensionByMime(file.mimetype);
	const targetPath = `${file.path}.${ext}`;

	fs.rename(file.path, targetPath, (err) => {
		if (err) {
			cb(err);
		}
		cb(null, targetPath)
	});
};