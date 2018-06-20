"use strict";

var _chai = require("chai");

var _fs = require("fs");

var _util = require("../util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("fastlane assets", function () {
  it("should add fastlane assets", function (done) {
    _util2.default.addFastfile().then(function () {
      try {
        var result = (0, _fs.statSync)(process.cwd() + "/.fastlane");
        _chai.assert.isOk(result);
        done();
      } catch (e) {
        // should not get here because assets exist
        _chai.assert.fail();
        done();
      }
    });
  });
  it("should remove fastlane assets", function (done) {
    _util2.default.addFastfile().then(function () {
      return _util2.default.removeFastfile();
    }).then(function () {
      try {
        (0, _fs.statSync)(process.cwd() + "/.fastlane");
        // should not get here because assets don't exist
        _chai.assert.fail();
        done();
      } catch (e) {
        _chai.assert.isOk(e);
        done();
      }
    });
  });
}); /* global describe it */

// eslint-disable-next-line
//# sourceMappingURL=fastlane.js.map