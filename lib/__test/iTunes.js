"use strict";

var _chai = require("chai");

var _iTunes = require("../iTunes");

var _iTunes2 = _interopRequireDefault(_iTunes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it */

// eslint-disable-next-line
describe("iTunes", function () {
  describe("exported functions", function () {
    var exportedFunctions = ["uploadTestFlight", "uploadAppStore"];
    exportedFunctions.map(function (exportedFunction) {
      return it("should have " + exportedFunction, function () {
        _chai.assert.isOk(_iTunes2.default[exportedFunction]);
      });
    });
  });
  describe("uploadTestFlight", function () {
    it("should do nothing if no ios platform", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks/android:" + process.env.PATH;
      _iTunes2.default.uploadTestFlight().then(function (result) {
        _chai.assert.equal(result, "skipped");
        done();
      });
    });
    it("should call fastlane", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      _iTunes2.default.uploadTestFlight().then(function (result) {
        _chai.assert.equal(result, "uploaded");
        done();
      });
    });
  });
  describe("uploadAppStore", function () {
    it("should do nothing if no ios platform", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks/android:" + process.env.PATH;
      _iTunes2.default.uploadAppStore().then(function (result) {
        _chai.assert.equal(result, "skipped");
        done();
      });
    });
    it("should call fastlane", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      _iTunes2.default.uploadAppStore().then(function (result) {
        _chai.assert.equal(result, "uploaded");
        done();
      });
    });
  });
});
//# sourceMappingURL=iTunes.js.map