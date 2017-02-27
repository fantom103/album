class DetailsController {
	constructor($stateParams, photoFactory) {
		'ngInject';
		const id = $stateParams.id;

    photoFactory.getPhoto(id).then((response) => {
      this.photo = response.data;
    });
	}
}

export default DetailsController;
