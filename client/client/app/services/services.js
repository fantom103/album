import angular from 'angular';
import photoFactory from './PhotoFactory';

let servicesModule = angular.module('app.services', [])
	.factory('photoFactory', photoFactory);

export default servicesModule;
