"use strict";

var _chai = require("chai");

var _play = require("../play");

var _play2 = _interopRequireDefault(_play);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it */

// eslint-disable-next-line
describe("play", function () {
  describe("exported functions", function () {
    var exportedFunctions = ["uploadPlayStore"];
    exportedFunctions.map(function (exportedFunction) {
      return it("should have " + exportedFunction, function () {
        _chai.assert.isOk(_play2.default[exportedFunction]);
      });
    });
  });
  describe("uploadPlayStore", function () {
    it("should do nothing if no android platform", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks/ios:" + process.env.PATH;
      _play2.default.uploadPlayStore().then(function (result) {
        _chai.assert.equal(result, "skipped");
        done();
      });
    });
    it("should call playup", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      _play2.default.uploadPlayStore().then(function (result) {
        _chai.assert.equal(result, "uploaded");
        done();
      });
    });
  });
});
//# sourceMappingURL=play.js.map