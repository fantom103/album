const HttpStatus = require('http-status-codes');
const {
	REQUEST_TOO_LONG,
	INTERNAL_SERVER_ERROR,
	BAD_REQUEST,
	NOT_FOUND} = HttpStatus;

const errors = {
	REQUEST_TOO_LONG: {
		msg: 'File size is too big',
		httpCode: REQUEST_TOO_LONG
	},

	UNKNOWN_ERROR: {
		msg: 'Something bad happened',
		httpCode: INTERNAL_SERVER_ERROR
	},

	NO_FILE: {
		msg: 'No file uploaded',
		httpCode: BAD_REQUEST
	},

	UNSUPPORTED_FILE: {
		msg: 'This file format is not supported',
		httpCode: BAD_REQUEST
	},

	NOT_FOUND: {
		msg: 'The item could not be found',
		httpCode: NOT_FOUND
	}
};

const sendError = (res, err, details = '') => {
	res.status(err.httpCode).json({
		err: err.msg,
		details
	});
};

module.exports = {errors, sendError};