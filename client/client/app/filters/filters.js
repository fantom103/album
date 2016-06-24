import angular from 'angular';
import reverse from './reverse';

const filtersModule = angular.module('app.filters', [])
	.filter('reverse', reverse);

export default filtersModule;
