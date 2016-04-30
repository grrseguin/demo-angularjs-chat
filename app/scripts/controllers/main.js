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
    'Chat',
    function(
      $log,
      _,
      User,
      Chat
    ) {
      var
        main = this;
      this.userA = {};
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
          main.userA.name = userA.name || 'anomymous';
          main.userA.contactList = _.map(userA.contactList, function(userId) {
            return User.get({
                userId: userId
              },
              /**
               * Get an `User` as contact for the first chat
               *
               * @param  {Object} contact [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)
               * @return {void}
               */
              function(contact) {
                Chat.query({
                    userId: userA.id,
                    contactId: contact.id
                  },
                  /**
                  * Get the list of messages for the first chat
                  *
                  * @param  {Array} messageList [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)
                  * @return {void}
                  */
                  function(messageList) {
                    contact.messageList = _.map(messageList, function( message ){
                      return _.assign(message, {
                        who: message.me ? 'Moi' : contact.name,
                        face: message.me ? userA.face : contact.face
                      });
                    });
                  },
                  /**
                   * Echec callback function for a list of messages
                   *
                   * @param  {Object} response HTML query response of the remote server
                   * @return {void}
                   */
                  function(response) {
                    $log.error(response.data);
                  }
                );
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
