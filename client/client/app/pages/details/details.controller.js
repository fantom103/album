class DetailsController {
	constructor($stateParams, photoFactory, config) {
		'ngInject';
		const id = $stateParams.id;

		this.server = config.server;

    photoFactory.getPhoto(id).then((response) => {
      this.photo = response.data;
    });
	}
}

export default DetailsController;
