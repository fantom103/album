const express = require('express');

const { OK, UNKNOWN_ERROR } = require('http-status-codes');

module.exports = (store) => {

  const router = express.Router({ mergeParams: true });
  router
    .route('/')
    .get((req, res) => {
      const email = req.query.email;

      const promise = email ? store.findUsersByEmail(email) : store.getAll();

      promise.then((data) => {
        res.status(OK).json(data.map((u) => {
            const copy = Object.assign({}, u);
            delete copy.password;
            return copy;
          }));
        })
        .catch((err) => {
          res.status(UNKNOWN_ERROR).json(err);
        });
    });

  return router;
};