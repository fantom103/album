export default class PhotoCardController {
  constructor(config) {
    "ngInject";

    const { photoPrefix } = config;
    this.photoPrefix = photoPrefix;
  }

  showDetails() {
    this.onShowDetails();
  }
}
