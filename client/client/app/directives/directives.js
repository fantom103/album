import angular from 'angular';
import fileInput from './FileInput';

let directivesModule = angular.module('app.directives', [])
	.directive('fileInput', fileInput);

export default directivesModule;