const userFactory = function ($http, config, $q) {
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
        method: "GET",
        params: { email }
      })
      .then((res) => def.resolve(res.data))
      .catch((err) => def.reject(err));

    return def.promise;
  };

  return {
    getUsers,
    findUsersByEmail
  }
};

export default userFactory;
