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
        userIdList = [
          'fitz-chevalerie',
          'le-grele'
        ];
      this.userList = _.map(userIdList, function(userId) {
        return User.get({
            userId: userId
          },
          /**
           * Get an `User`
           * Success callback function
           *
           * @param  {Object} user [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)
           * @return {void}
           */
          function(user) {
            user.name = user.name || 'anomymous';
            user.contactList = _.map(user.contactIdList, function(contactId) {
              return User.get({
                  userId: contactId
                },
                /**
                 * Get an `User` as contact
                 *
                 * @param  {Object} contact [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)
                 * @return {void}
                 */
                function(contact) {
                  Chat.query({
                      userId: user.id,
                      contactId: contact.id
                    },
                    /**
                     * Get the list of messages
                     *
                     * @param  {Array} messageList [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)
                     * @return {void}
                     */
                    function(messageList) {
                      contact.messageList = _.map(messageList, function(message) {
                        return _.assign(message, {
                          who: message.me ? 'Moi' : contact.name,
                          face: message.me ? user.face : contact.face
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
      });
    }
  ]);
