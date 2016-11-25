import angular from 'angular';
import uiRouter from 'angular-ui-router';
import landingComponent from './landing.component';

let landingModule = angular.module('landing', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {
		"ngInject";

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('landing', {
				url: '/landing',
				template: '<landing></landing>'
			});
	})
	.component('landing', landingComponent);

export default landingModule;
