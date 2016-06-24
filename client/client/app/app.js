import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Components from './components/components';
import Pages from './pages/pages';
import Services from './services/services';
import Directives from './directives/directives';
import Filters from './filters/filters';
import AppComponent from './app.component';

angular.module('app', [
		uiRouter,
		Components.name,
		Pages.name,
		Services.name,
		Filters.name,
		Directives.name
	])
	.config(($locationProvider) => {
		"ngInject";
		// @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
		// #how-to-configure-your-server-to-work-with-html5mode
		$locationProvider.html5Mode(true).hashPrefix('!');
	})
	.component('app', AppComponent);
