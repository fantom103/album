import angular from 'angular';
import photoFactory from './PhotoFactory';
import accountFactory from './AccountFactory';

const servicesModule = angular.module('app.services', [])
	.factory('photoFactory', photoFactory)
	.factory('accountFactory', accountFactory);

export default servicesModule;