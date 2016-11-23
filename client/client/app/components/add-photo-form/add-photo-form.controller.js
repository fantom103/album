export default class AddPhotoFormController {
  constructor(photoFactory, config) {
    "ngInject";

    const {photoPrefix, uploadEndpoint} = config;
    this._photoFactory = photoFactory;

    this.uploadEndpoint = uploadEndpoint;
    this.photoPrefix = photoPrefix;
    this.pic = '';
    this.path = '';
    this.title = '';
    this.reset();
	}

  onImageUploaded(path) {
    this.path = path;
    this.pic = `${this.photoPrefix}${path}`;
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
