const userFactory = function ($http, config) {
  "ngInject";

  const {api} = config;

  let user = null;

  const isLoggedIn = () => !!user;

  const login = (email, pass) => {
    console.log('Logging in');
    return $http.post(`${api}/login/`, {title, path});
  };

  return {
    login
  }
};

export default userFactory;
