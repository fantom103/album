class HomeController {
	constructor($state, photoFactory, userFactory) {
		"ngInject";

		this._photoFactory = photoFactory;
		this.$state = $state;
		this.photos = [];

		userFactory.getUserPhotos().then((response) => {
			this.photos = response.data;
		});
	}

	addPhoto(photo) {
		this.photos.push(photo);
	};

	showError() {
		console.log('Could not add photo');
	};

	showDetails(id) {
		this.$state.go('details', {id: id});
	}
}

export default HomeController;
