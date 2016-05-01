'use strict';

describe('Service: Chat', function () {

  // load the service's module
  beforeEach(module('demoAngularjsChatApp'));

  // instantiate service
  var Chat;
  beforeEach(inject(function (_Chat_) {
    Chat = _Chat_;
  }));

  it('should expose the expected method', function () {
    expect(typeof Chat.get === 'function').toBe(true);
    expect(typeof Chat.save === 'function').toBe(true);
  });

});
