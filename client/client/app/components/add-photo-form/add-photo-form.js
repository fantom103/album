import angular from 'angular';
import addPhotoFormComponent from './add-photo-form.component';

const addPhotoFormModule = angular.module('add-photo-form', [])
	.component('addPhotoForm', addPhotoFormComponent);

export default addPhotoFormModule;
