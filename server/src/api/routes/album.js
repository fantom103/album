const express = require('express');
const sizeOf = require('image-size');
const {OK, CREATED} = require('http-status-codes');

const {errors, sendError} = require('../errors');

const {
  UNKNOWN_ERROR,
  NOT_FOUND
} = errors;

module.exports = (store) => {

  const router = express.Router({ mergeParams: true });

  router
    .route('/')
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
    .route('/:picId')
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
    .route('/:picId/details')
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

  return router;
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

const getImageSizeById = (id, store, cb) => {
  store
    .find(id)
    .then((photo) => {
      sizeOf(photo.path, cb);
    })
    .catch(cb);
};
