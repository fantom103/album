class LoginController {
	constructor($state, photoFactory) {
		"ngInject";

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

export default LoginController;
