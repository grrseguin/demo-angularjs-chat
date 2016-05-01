'use strict';

describe('Service: User', function () {

  // load the service's module
  beforeEach(module('demoAngularjsChatApp'));

  // instantiate service
  var User;
  beforeEach(inject(function (_User_) {
    User = _User_;
  }));

  it('should expose the expected method', function () {
    expect(typeof User.get === 'function').toBe(true);
  });

});
