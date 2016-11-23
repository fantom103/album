import angular from 'angular';
import Home from './home/home';
import Details from './details/details';
import Login from './login/login';

const pagesModule = angular.module('app.pages', [
  Home.name,
  Details.name,
  Login.name
]);

export default pagesModule;
