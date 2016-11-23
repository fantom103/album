const sessionFactory = function ($http, $q, config) {
  "ngInject";

  const {api} = config;

  let user = null;

  const isLoggedIn = () => !!user;

  const getUser = () => user;

  const login = (email, password) => {
    const deferred = $q.defer();

    $http
      .post(`${api}/login/`, {email, password})
      .then((payload) => {
        user = payload.data.user;
        deferred.resolve(payload.data.user)
      })
      .catch((err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  };

  return {
    login,
    getUser,
    isLoggedIn
  }
};

export default sessionFactory;
