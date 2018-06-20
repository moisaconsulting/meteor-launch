"use strict";

var _chai = require("chai");

var _hockey = require("../hockey");

var _hockey2 = _interopRequireDefault(_hockey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it */

// eslint-disable-next-line
describe("hockey", function () {
  describe("exported functions", function () {
    var exportedFunctions = ["uploadIOS", "uploadAndroid"];
    exportedFunctions.map(function (exportedFunction) {
      return it("should have " + exportedFunction, function () {
        _chai.assert.isOk(_hockey2.default[exportedFunction]);
      });
    });
  });
  describe("uploadIOS", function () {
    it("should skip if no ios platform", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks/android:" + process.env.PATH;
      _hockey2.default.uploadIOS(process.env).then(function (result) {
        _chai.assert.equal(result, "skipped");
        done();
      });
    });
    it("should call fastlane", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      _hockey2.default.uploadIOS(process.env).then(function (result) {
        _chai.assert.equal(result, "uploaded");
        done();
      });
    });
  });
  describe("uploadAndroid", function () {
    it("should do nothing if no android platform", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks/ios:" + process.env.PATH;
      _hockey2.default.uploadAndroid(process.env).then(function (result) {
        _chai.assert.equal(result, "skipped");
        done();
      });
    });
    it("should curl hockey API", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      _hockey2.default.uploadAndroid(process.env).then(function (result) {
        _chai.assert.equal(result, "uploaded");
        done();
      });
    });
  });
});
//# sourceMappingURL=hockey.js.map