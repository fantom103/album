const express = require('express');

const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');

module.exports = (store) => {

  const router = express.Router({ mergeParams: true });
  router
    .route('/')
    .get(listUsers(store));

  router
    .route('/:uid')
    .get(getUserInfo(store, getBasicInfo));

  router
    .route('/:uid/followers')
    .get(getUserInfo(store, getFollowers, getBasicInfo));

  router
    .route('/:uid/following')
    .get(getUserInfo(store, getFollowing, getBasicInfo))
    .post(followUser(store));


  router
    .route('/:uid/photos')
    .get(getUserInfo(store, getPhotos));

  return router;
};

const listUsers = (store) => {
  return (req, res) => {
    const email = req.query.email;

    const promise = email ? store.findUsersByEmail(email) : store.getAll();

    promise
      .then((data) => {
        res.status(OK).json(data.map(getBasicInfo));
      })
      .catch((err) => {
        res.status(INTERNAL_SERVER_ERROR).json(err);
      });
  }
};

const getUserInfo = (store, filter, collectionFilter) => {
  return (req, res) => {
    const id = req.params.uid;
    store
      .findUserById(id)
      .then((user) => {
        if (user) {
          let result = filter(user);

          if (typeof collectionFilter === 'function') {
            result = result.map(collectionFilter);
          }
          res.status(OK).json(result);
        } else {
          res.status(NOT_FOUND).send('');
        }
      })
      .catch((err) => {
        res.status(INTERNAL_SERVER_ERROR).json(err)
      });
  };
};

const followUser = (store) => {
  return (req, res) => {
    const followerId = req.params.uid;
    const targetId = req.body._id;

    store
      .followUser(followerId, targetId)
      .then((target) => {
        res.status(OK).json(getBasicInfo(target));
      })
      .catch((err) => {
        res.status(INTERNAL_SERVER_ERROR).json(err);
      });
  }
};


const getBasicInfo = (u) => {
  const {_id, email} = u;
  return {
    _id, email
  };
};

const getFollowers = (u) => u.followers;

const getFollowing = (u) => u.following;

const getPhotos = (u) => u.photos;