import angular from 'angular';
import photoFactory from './photo-factory';
import sessionFactory from './session-factory';

const servicesModule = angular.module('app.services', [])
	.factory('photoFactory', photoFactory)
	.factory('sessionFactory', sessionFactory);

export default servicesModule;