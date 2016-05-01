'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module(
    'demoAngularjsChatApp',
    'test/mock/users/fitz-chevalerie.json',
    'test/mock/users/le-grele.json',
    'test/mock/chats/fitz-chevalerie/le-grele.json',
    'test/mock/chats/le-grele/fitz-chevalerie.json'
  ));

  var
    MainCtrl,
    _;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(
    $controller,
    $log,
    Lodash,
    User,
    Chat,
    $httpBackend,
    _testMockUsersFitzChevalerie_,
    _testMockUsersLeGrele_,
    _testMockChatsFitzChevalerieLeGrele_,
    _testMockChatsLeGreleFitzChevalerie_
  ) {
    $httpBackend.when('GET', 'flow/users/fitz-chevalerie.json').respond(_testMockUsersFitzChevalerie_);
    $httpBackend.expectGET('flow/users/fitz-chevalerie.json');
    $httpBackend.when('GET', 'flow/users/le-grele.json').respond(_testMockUsersLeGrele_);
    $httpBackend.expectGET('flow/users/le-grele.json');
    $httpBackend.when('GET', 'flow/chats/fitz-chevalerie/le-grele.json').respond(_testMockChatsFitzChevalerieLeGrele_);
    $httpBackend.expectGET('flow/chats/fitz-chevalerie/le-grele.json');
    $httpBackend.when('GET', 'flow/chats/le-grele/fitz-chevalerie.json').respond(_testMockChatsLeGreleFitzChevalerie_);
    $httpBackend.expectGET('flow/chats/le-grele/fitz-chevalerie.json');
    MainCtrl = $controller('MainCtrl', {
      $log: $log,
      _: Lodash,
      User: User,
      Chat: Chat
    });
    $httpBackend.flush();
    _ = Lodash;
  }));
  it('Should fill the user list.', function() {
    expect(MainCtrl.userList.length).toEqual(2);
  });
  it('Each user should have the attributes expected', function() {
    _.forEach(MainCtrl.userList, function(user) {
      expect(typeof user.name === 'string').toBe(true);
      expect(user.contactList instanceof Array).toBe(true);
      expect(user.form instanceof Object).toBe(true);
      expect(typeof user.submit === 'function').toBe(true);
    });
  });
  it('Each contact should have a list of message', function() {
    _.forEach(MainCtrl.userList, function(user) {
      _.forEach(user.contactList, function(contact) {
        expect(contact.messageList instanceof Array).toBe(true);
      });
    });
  });
  it('Each user should have the same length of messages', function(){
    _.forEach(MainCtrl.userList, function(user) {
      _.forEach(user.contactList, function(contact) {
        expect(contact.messageList.length).toBe(2);
      });
    });
  });
});
