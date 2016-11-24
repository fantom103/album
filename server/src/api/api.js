const express = require('express');
const { errors, sendError } = require('./errors');

const { UNKNOWN_ERROR } = errors;
const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');
const albumRouter = require('./routes/album');

const API_VERSION = 'v0.0.1';

module.exports = (passport, photoStore, config) => {
  const router = express.Router({ mergeParams: true });

  router
    .route('/')
    .get((req, res) => res.send(`Album API ${API_VERSION}`));

  router.use('/', authRouter(passport));
  router.use('/', uploadRouter(config.get('upload')));
  router.use('/album', albumRouter(photoStore));

  /**
   * Error handling middleware. These will be quite
   * bad errors that other layers didn't handle. For example
   * programming errors.
   */
  router.use(((err, req, res, next) => {
    console.error(err.stack);
    sendError(res, UNKNOWN_ERROR, err.message);
  }));

  return router;
};


