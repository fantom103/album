import angular from 'angular';
import Home from './home/home';
import Details from './details/details';
import Login from './login/login';
import Signup from './signup/signup';
import Profile from './profile/profile';
import Landing from './landing/landing';

const pagesModule = angular.module('app.pages', [
  Home.name,
  Details.name,
  Login.name,
  Signup.name,
  Profile.name,
  Landing.name
]);

export default pagesModule;