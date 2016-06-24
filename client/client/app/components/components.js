import angular from 'angular';

import Navbar from './navbar/navbar';
import AddPhotoForm from './add-photo-form/add-photo-form';
import PhotoCard from './photo-card/photo-card';

const commonModule = angular.module('app.components', [
	Navbar.name,
	AddPhotoForm.name,
	PhotoCard.name
]);

export default commonModule;
