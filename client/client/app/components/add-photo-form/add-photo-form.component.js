import template from './add-photo-form.html';
import controller from './add-photo-form.controller';
import './add-photo-form.styl';

let addPhotoFormComponent = {
	restrict: 'E',
	bindings: {
		onPhotoAdded: '&onPhotoAdded',
		onPhotoAddedError: '&onPhotoAddedError'
	},
	template,
	controller,
	controllerAs: 'vm'
};

export default addPhotoFormComponent;
