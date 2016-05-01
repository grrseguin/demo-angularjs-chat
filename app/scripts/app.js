'use strict';

/**
 * @ngdoc overview
 * @name demoAngularjsChatApp
 * @description
 * # demoAngularjsChatApp
 *
 * Main module of the application.
 */
angular
  .module('demoAngularjsChatApp', [
    'ngResource',
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngMaterial'
  ])
  .config([
    '$mdThemingProvider',
    function(
      $mdThemingProvider
    ) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('grey');
    }
  ])
  .run(
    /**
     * [run](https://docs.angularjs.org/api/ng/type/angular.Module#run) method of angular module.
     *
     * @param  {object} _ Could allow to "erase" the global reference to the lodash library
     * @return {void}
     */
    function(
      _ // jshint ignore:line
    ) {

    }
  );
