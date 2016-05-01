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
        /**
         * reference to this Controller
         *
         * @type {Object}
         */
        main = this,
        /**
         * Class of a Message
         * A message belongs to a `Chat`
         * Must be called with the `new` operator
         *
         * @param  {Boolean} me     True if the message matches to the current `User`, otherwise false
         * @param  {String} text    Message to send
         * @param  {Object} user    Current `User`
         * @param  {Object} contact receiver `User`
         * @return {Object}         Instance of a new message
         */
        Message = function(me, text, user, contact) {
          return {
            me: me,
            text: text,
            who: me ? user.name : contact.name,
            face: me ? user.face : contact.face
          };
        },
        /**
         * list of user id
         *
         * @type {Array}
         */
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
                        return new Message(message.me, message.text, user, contact);
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
            /**
             * Form directive for one `User`
             *
             * @type {Object}
             */
            user.form = {};
            /**
             * Add a new Message in the Chat of the current `User` and the receiver `User`
             *
             * @param  {Object} contact `User` in the current `User`'s list of contact
             * @return {void}
             */
            user.submit = function(contact) {
              if (this.form.$valid) {
                try {
                  var
                    newMessage = new Message(true, this.newText, this, contact),
                    /**
                     * receiver `User`
                     *
                     * @type {Object}
                     */
                    destUser = main.userList[_.findIndex(main.userList, {
                      id: contact.id
                    })];
                  contact.messageList.push(newMessage);
                  /**
                   * I could use a directive to send the new message to The
                   * receiver's Chat. But to avoid two digest cycles, i prefer
                   * to set directly the good `User` object.
                   *
                   * in the real life, i should to use the `Chat` Factory
                   * with the `$save` method.
                   */
                  destUser.contactList[_.findIndex(destUser.contactList, {
                    id: this.id
                  })].messageList.push(newMessage);
                } catch (e) {
                  $log.error(e.message);
                } finally {
                  this.form.$setPristine();
                  this.form.$setUntouched();
                  this.newText = '';
                }
              } else {
                $log.debug('The current form is not valid !');
              }
            };
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
