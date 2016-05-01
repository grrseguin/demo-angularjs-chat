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
    'Lodash',
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
         * Format the message to a `Chat`
         *
         * @param  {Boolean} me     True if the message belongs to the current `User`, otherwise false
         * @param  {String} text    Message to send
         * @return {Object}         Instance of a new `Chat`
         */
        format = function(me, text) {
          return {
            me: me,
            text: text,
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
                      contact.messageList = messageList;
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
             * Add a new Chat in the Chat of the current `User` and the contact `User`
             *
             * @param  {Object} contact `User` in the current `User`'s list of contact
             * @return {void}
             */
            user.submit = function(contact) {
              if (this.form.$valid) {
                try {
                  var
                    newUserChat = new Chat(format(true, this.newText)),
                    newContactChat = new Chat(format(false, this.newText)),
                    /**
                     * receiver `User`
                     *
                     * @type {Object}
                     */
                    destUser = main.userList[_.findIndex(main.userList, {
                      id: contact.id
                    })];
                  contact.messageList.push(newUserChat);
                  newUserChat.$save({
                      userId: this.id,
                      contactId: contact.id
                    },
                    /**
                     * Add a new `Chat` for the current user
                     * Success callback function
                     *
                     * @return {void}
                     */
                    function() {},
                    /**
                     * Echec callback function
                     *
                     * @param  {Object} response HTML query response of the remote server
                     * @return {void}
                     */
                    function(response) {
                      $log.error(response.data);
                    }
                  );
                  /**
                   * I could use a directive to update the view of the contact's Chat.
                   * But to avoid two digest cycles, i prefer
                   * to set directly the good `User` object.
                   */
                  destUser.contactList[_.findIndex(destUser.contactList, {
                    id: this.id
                  })].messageList.push(newContactChat);
                  newContactChat.$save({
                      userId: contact.id,
                      contactId: this.id
                    },
                    /**
                     * Add a new `Chat` for the contact
                     * Success callback function
                     *
                     * @return {void}
                     */
                    function() {},
                    /**
                     * Echec callback function
                     *
                     * @param  {Object} response HTML query response of the remote server
                     * @return {void}
                     */
                    function(response) {
                      $log.error(response.data);
                    }
                  );
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
           * Echec callback function
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
