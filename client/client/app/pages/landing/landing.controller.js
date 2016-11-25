class LandingController {
  constructor($state, sessionFactory) {
    "ngInject";
    this.sessionFactory = sessionFactory;
    this.$state = $state;
  }

  $onInit() {
    this.sessionFactory
      .getSession()
      .then((result) => {
        this.$state.go(result ? 'home' : 'login');
      });
  };
}

export default LandingController;
