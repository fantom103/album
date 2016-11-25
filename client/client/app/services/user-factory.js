const userFactory = function ($http, config, $q, sessionFactory) {
  "ngInject";

  const { api } = config;

  const getUsers = () => {
    const def = $q.defer();

    $http.get(`${api}/user/`)
      .then((res) => def.resolve(res.data))
      .catch((err) => def.reject(err));

    return def.promise;
  };

  const findUsersByEmail = (email) => {
    const def = $q.defer();

    $http({
        url: `${api}/user`,
        method: 'GET',
        params: { email }
      })
      .then((res) => def.resolve(res.data))
      .catch((err) => def.reject(err));

    return def.promise;
  };

  const getUserPhotos = () => {
    const uid = sessionFactory.getUserId();
    return $http.get(`${api}/user/${uid}/photos`);
  };

  const getUserFollowing = () => {
    // const uid = sessionFactory.getUserId();
    // return $http.get(`${api}/user/${uid}/photos`);
  };

  return {
    getUsers,
    findUsersByEmail,
    getUserPhotos
  }
};

export default userFactory;
