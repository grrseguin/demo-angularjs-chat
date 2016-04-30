'use strict';

/**
 * @ngdoc service
 * @name demoAngularjsChatApp.User
 * @description
 * # User [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)
 * Factory in the demoAngularjsChatApp.
 *
 * Handle the user data
 */
angular.module('demoAngularjsChatApp')
  .factory('User', [
    '$resource',
    function(
      $resource
    ) {
      return $resource('flow/users/:userId.json');
    }
  ]);
