'use strict';

/**
 * @ngdoc service
 * @name demoAngularjsChatApp.
 * @description
 * # Lodash (_) library
 * Factory in the demoAngularjsChatApp.
 */
angular.module('demoAngularjsChatApp')
  .factory('Lodash', [
    '$window',
    function($window) {
      var
        Lodash = $window._;
      // Public API here
      return Lodash;
    }
  ]);
