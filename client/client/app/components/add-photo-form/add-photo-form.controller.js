export default class AddPhotoFormController {
  constructor(photoFactory, config) {
    'ngInject';

    this._photoFactory = photoFactory;
    this._server = config.server;

    this.uploadPath = config.upload;
    this.pic = '';
    this.path = '';
    this.title = '';
    this.reset();

	}

	onImageUploaded(path) {
		this.path = path;
		this.pic = this._server + '/' + path;
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
