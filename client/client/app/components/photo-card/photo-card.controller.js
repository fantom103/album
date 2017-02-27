export default class PhotoCardController {
  constructor(config){
    'ngInject';

    this.server = config.server;
  }

  showDetails() {
    this.onShowDetails();
  }
}
