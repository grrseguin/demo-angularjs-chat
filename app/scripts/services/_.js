'use strict';

/**
 * @ngdoc service
 * @name demoAngularjsChatApp.
 * @description
 * # Lodash (_) library
 * Factory in the demoAngularjsChatApp.
 */
angular.module('demoAngularjsChatApp')
  .factory('_', [
    '$window',
    function($window) {
      var
        _ = $window._;
      delete($window._);
      // Public API here
      return (_);
    }
  ]);
