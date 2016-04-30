'use strict';

/**
 * @ngdoc service
 * @name demoAngularjsChatApp.Chat
 * @description
 * # Chat [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)
 * Factory in the demoAngularjsChatApp.
 *
 * Handle the chat data
 */
angular.module('demoAngularjsChatApp')
  .factory('Chat', [
    '$resource',
    function(
      $resource
    ) {
      return $resource('flow/chats/:userId/:contactId.json');
    }
  ]);
