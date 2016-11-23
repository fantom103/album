const userFactory = function ($http, $q, config) {
  "ngInject";

  const {api} = config;

  let user = null;

  const isLoggedIn = () => !!user;

  const login = (email, password) => {
    const deferred = $q.defer();

    $http
      .post(`${api}/login/`, {email, password})
      .then((payload) => {
        user = payload.data;
        deferred.resolve(payload.data)
      })
      .catch((err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  };

  return {
    login,
    isLoggedIn
  }
};

export default userFactory;
