import angular from 'angular';
import photoFactory from './photo-factory';
import accountFactory from './user-factory';

const servicesModule = angular.module('app.services', [])
	.factory('photoFactory', photoFactory)
	.factory('userFactory', accountFactory);

export default servicesModule;