class ProfileController {
  constructor($state, sessionFactory) {
    "ngInject";

    this.sessionFactory = sessionFactory;
    this.user = sessionFactory.getUser();
    this.email = '';

    this.gotSearchResult = false;

	}

	onSearch() {
	  console.log('Searching');
  }
}

export default ProfileController;
