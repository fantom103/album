import angular from 'angular';
import uiRouter from 'angular-ui-router';
import detailsComponent from './details.component';
import './details.styl';

let detailsModule = angular.module('details', [
		uiRouter
	])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state('details', {
				url: '/photo/:id',
				template: '<photo-details></photo-details>'
			});
	})

	.component('photoDetails', detailsComponent);

export default detailsModule;
