import angular from 'angular';
import photoCardComponent from './photo-card.component';

const photoCardModule = angular.module('photo-card', [])
	.component('photoCard', photoCardComponent);

export default photoCardModule;
