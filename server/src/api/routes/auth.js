const express = require('express');

const { OK } = require('http-status-codes');

module.exports = (passport) => {

  const router = express.Router({ mergeParams: true });
  router
    .route('/login')
    .post(passport.authenticate('local-login'), (req, res) => {

      const user = Object.assign({}, req.user);
      delete user.password;

      const {_id, email} = user;

      res.status(OK).json({_id, email});
    });

  router
    .route('/profile')
    .get((req, res) => {
      res.status(OK).json({
        'hello': 'world'
      });
    });

  return router;
};