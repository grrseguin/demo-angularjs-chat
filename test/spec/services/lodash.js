'use strict';

describe('Service: Lodash', function () {

  // load the service's module
  beforeEach(module('demoAngularjsChatApp'));

  // instantiate service
  var _;
  beforeEach(inject(function (_Lodash_) {
    _ = _Lodash_;
  }));

  it('should expose the expected library', function () {
    expect(typeof _.map === 'function').toBe(true);
    expect(typeof _.findIndex === 'function').toBe(true);
  });

});
