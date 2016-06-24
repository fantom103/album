import angular from 'angular';
import Home from './home/home';
import Details from './details/details';

const pagesModule = angular.module('app.pages', [
	Home.name,
	Details.name
]);

export default pagesModule;
