import angular from 'angular';
import photoFactory from './photo-factory';
import sessionFactory from './session-factory';
import userFactory from './user-factory';

const servicesModule = angular.module('app.services', [])
	.factory('photoFactory', photoFactory)
	.factory('sessionFactory', sessionFactory)
	.factory('userFactory', userFactory);

export default servicesModule;