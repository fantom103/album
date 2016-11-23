class DetailsController {
	constructor($stateParams, $q, photoFactory, config) {
		"ngInject";
		const id = $stateParams.id;

		const { photoPrefix } = config;

		this.photoPrefix = photoPrefix;
		/**
		 * We could update the parts of UI
		 * as data arrives, but this way it will update
		 * all in one piece. Will give slightly better user
		 * experience if the loading is not instant.
		 */
		$q.all([
			photoFactory.getPhoto(id),
			photoFactory.getPhotoDetails(id)
		]).then((values) => {
			this.photo = values[0].data;
			this.dim = values[1].data;
		}, (err) => {
			// Error reporting is out of scope
			// for this small demo
			console.log(err);
		});
	}
}

export default DetailsController;
