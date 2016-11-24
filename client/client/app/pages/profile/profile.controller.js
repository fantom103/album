class ProfileController {
  constructor($state, sessionFactory, userFactory) {
    "ngInject";

    this.sessionFactory = sessionFactory;
    this.userFactory = userFactory;

    this.user = sessionFactory.getUser();
    this.email = '';

    this.gotSearchResult = false;
    this.searchResult = [];

	}

	onSearch() {
	  this.userFactory
      .findUsersByEmail(this.email)
      .then((users) => {
        this.gotSearchResult = true;
        this.searchResult = users;
      })
      .catch((err) => {
        console.log('Could not find users', err)
      });
  }
}

export default ProfileController;
