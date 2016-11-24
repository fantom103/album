
// allowed mime types
const JPEG_MIME = 'image/jpeg';
const PNG_MIME = 'image/png';

const MIME_TO_EXT = {};
MIME_TO_EXT[JPEG_MIME] = 'jpg';
MIME_TO_EXT[PNG_MIME] = 'png';

const isImageMime = (mime) => {
	return [JPEG_MIME, PNG_MIME].indexOf(mime) > -1;
};

const getExtensionByMime = (mime) => {
	return MIME_TO_EXT[mime];
};

module.exports = {
	isImageMime, getExtensionByMime
};