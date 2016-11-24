const nconf = require('nconf');
const path = require('path');
const fs = require('fs');
const fileExists = require('file-exists');

const fullPath = path.normalize(`${process.cwd()}/album.config.json`);
console.log(`Loading configuration from ${fullPath}`);

if (!fileExists(fullPath)) {
	console.error('Config not found, exiting');
	process.exit(1);
}

nconf.argv().env().file({ file: fullPath });

/**
 * Ideally in production we should validate the config
 * in here, nconf-validator would be a good module to do
 * that
 */

nconf.defaults({
	limits: {
		fileSize: 2*1024*1024
	}
});

module.exports = nconf;