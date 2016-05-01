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
  ]);
