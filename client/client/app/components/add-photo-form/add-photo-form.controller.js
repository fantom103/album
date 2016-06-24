export default class AddPhotoFormController {
	constructor(photoFactory) {
		"ngInject";

		this._photoFactory = photoFactory;

		this.pic = '';
		this.path = '';
		this.title = '';
		this.reset();

	}

	onImageUploaded(path) {
		this.path = path;
		this.pic = 'http://localhost:9090/' + path;
	}

	postPhoto() {
		this._photoFactory.addPhoto(this.title, this.path).then((resp) => {
			this.onPhotoAdded({
				photo: resp.data
			});
			this.reset();
		});
	}

	reset() {
		this.pic = 'img/placeholder.jpg';
		this.path = '';
	}
}
