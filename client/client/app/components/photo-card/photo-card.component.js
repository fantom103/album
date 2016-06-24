import template from './photo-card.html';
import controller from './photo-card.controller';

const photoCardComponent = {
	restrict: 'E',
	bindings: {
		photo: '=',
		onShowDetails: '&onShowDetails'
	},
	template,
	controller,
	controllerAs: 'vm'
};

export default photoCardComponent;
