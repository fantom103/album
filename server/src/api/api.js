const express = require('express');
const albumUploader = require('./album-uploader');
const async = require('async');
const sizeOf = require('image-size');
const {errors, sendError} = require('./errors');

const {OK, CREATED} = require('http-status-codes');

const {
  UNKNOWN_ERROR,
  NOT_FOUND
} = errors;

const API_VERSION = 'v0.0.1';

module.exports = (passport, store, config) => {
  const router = express.Router();

  router
    .route('/')
    .get((req, res) => {
      res.send(`Album API ${API_VERSION}`);
    });

  router
    .route('/login')
    .post(passport.authenticate('local-login'), (req, res) => {

      res.json({
        message:"Hurray",
        user: req.user});
    });

  router
    .route('/profile')
    .get((req, res) => {
      res.status(OK).json({
        'hello': 'world'
      });
    });

  router
    .route('/upload')
    .post(albumUploader(config.get('upload')));

  router
    .route('/album')
    .get((req, res) => {
      store
        .getAll()
        .then((data) => onStoreResponse(res, OK)(null, data))
        .catch((err) => onStoreResponse(res, OK)(err));
    })
    .post((req, res) => {
      const item = req.body;
      store
        .add(item)
        .then((item) => onStoreResponse(res, CREATED)(null, item))
        .catch((err) => onStoreResponse(res, CREATED)(err))
    });

  router
    .route('/album/:picId')
    .get((req, res) => {
      const id = +req.params.picId;
      store
        .find(id)
        .then((item) => onStoreResponse(res, OK)(null, item))
        .catch((err) => onStoreResponse(res, OK)(err));
    })
    .put((req, res) => {
      const id = +req.params.picId;
      const item = req.body;
      store
        .update(id, item)
        .then((item) => onStoreResponse(res, OK)(null, item))
        .catch((err) => onStoreResponse(res, OK)(err))
    })
    .delete((req, res) => {
      const id = +req.params.picId;
      store
        .remove(id)
        .then((item) => onStoreResponse(res, OK)(null, item))
        .catch((err) => onStoreResponse(res, OK)(err));
    });

  router
    .route('/album/:picId/details')
    .get((req, res) => {
      const id = +req.params.picId;

      getImageSizeById(id, store, (err, dim) => {
        if (err) {
          sendError(res, UNKNOWN_ERROR);
          return;
        }

        res.status(OK).json(dim);
      });
    });

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

const getImageSizeById = (id, store, cb) => {
  store
    .find(id)
    .then((photo) => {
      sizeOf(photo.path, cb);
    })
    .catch(cb);
};

const onStoreResponse = (res, successCode) => {
  return (err, data) => {
    if (!err) {
      res.status(successCode).json(data);
      return;
    }

    /**
     * Similarly we could distinguish other errors
     * in the same switch and return well-explained
     * errors to calling clients with the relevant
     * error codes.
     */
    switch(err.name) {
      case 'ItemNotFound':
        sendError(res, NOT_FOUND, err.message);
        break;
      default:
        sendError(res, UNKNOWN_ERROR, err.message);
      break;
    }
  }
};