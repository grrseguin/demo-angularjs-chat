'use strict';

/**
 * @ngdoc function
 * @name demoAngularjsChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoAngularjsChatApp
 */
angular.module('demoAngularjsChatApp')
  .controller('MainCtrl', [
    '$log',
    '_',
    'User',
    function(
      $log,
      _,
      User
    ) {
      var
        main = this;
      this.contactList = [];
      User.get({
          userId: 'fitz-chevalerie'
        },
        /**
         * Get an `User` for the first Chat
         * Success callback function
         *
         * @param  {Object} userA [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)
         * @return {void}
         */
        function(userA) {
          main.name = userA.name || 'anomymous';
          main.contactList = _.map(userA.contactList, function(userId) {
            return User.get(
              {
                userId: userId
              },
              /**
               * Get an `User` as contact
               * @param  {Object} contact [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)
               * @return {void}
               */
              function( contact ){
                 console.log(contact);
              },
              /**
               * Echec callback function for a contact
               *
               * @param  {Object} response HTML query response of the remote server
               * @return {void}
               */
              function(response) {
                $log.error(response.data);
              }
            );
          });
        },
        /**
         * Echec callback function for the first Chat
         *
         * @param  {Object} response HTML query response of the remote server
         * @return {void}
         */
        function(response) {
          $log.error(response.data);
        }
      );
    }
  ]);
