const sessionFactory = function ($http, $q, config) {
  "ngInject";

  const {api} = config;

  let user = null;

  const isLoggedIn = () => !!user;

  const getUser = () => user;

  const getUserId = () => user._id;

  const getSession = () => {
    return $http
      .get(`${api}/session`)
      .then((payload) => {
        console.log('then');
        payload.user;
      })
      .catch((payload) => {
        console.log('catch');
        return null;
      });
  };

  const login = (email, password) => {
    const deferred = $q.defer();

    $http
      .post(`${api}/login/`, {email, password})
      .then((payload) => {
        user = payload.data;
        deferred.resolve(user)
      })
      .catch((err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  };

  return {
    login,
    getUser,
    isLoggedIn,
    getUserId,
    getSession
  }
};

export default sessionFactory;