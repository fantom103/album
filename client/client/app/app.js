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

const base = 'http://localhost:9090';

angular.module('app', [
  uiRouter,
  Components.name,
  Pages.name,
  Services.name,
  Filters.name,
  Directives.name
])
  .constant('config', {
    server: base,
    api: `${base}/api`,
    upload: `${base}/api/upload`
	})
	.config(($locationProvider) => {
		"ngInject";
		// @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
		// #how-to-configure-your-server-to-work-with-html5mode
		$locationProvider.html5Mode(true).hashPrefix('!');
	})
	.component('app', AppComponent);
