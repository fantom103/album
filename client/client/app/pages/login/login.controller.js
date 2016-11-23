class LoginController {
  constructor($state, userFactory) {
    "ngInject";

    this.$state = $state;
    this.userFactory = userFactory;

    this.email = '';
    this.pass = '';
  }

  onLogin() {
    this.userFactory
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
