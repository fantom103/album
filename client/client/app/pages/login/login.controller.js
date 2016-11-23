class LoginController {
  constructor($state, sessionFactory) {
    "ngInject";

    this.$state = $state;
    this.sessionFactory = sessionFactory;

    this.email = '';
    this.pass = '';
  }

  onLogin() {
    this.sessionFactory
      .login(this.email, this.pass)
      .then((result) => {
        this.$state.go('profile');
      })
      .catch((err) => {
        console.log('Could not log it');
      });
  }
}

export default LoginController;
