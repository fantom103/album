const express = require('express');

const { OK } = require('http-status-codes');

module.exports = (passport) => {

  const router = express.Router({mergeParams: true});
  router
    .route('/login')
    .post(passport.authenticate('local-login'), (req, res) => {
      res.status(OK).json({
        message:"Hurray",
        user: req.user
      });
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