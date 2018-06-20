"use strict";

var _chai = require("chai");

var _meteor = require("../meteor");

var _meteor2 = _interopRequireDefault(_meteor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it */

// eslint-disable-next-line
describe("meteor", function () {
  describe("exported functions", function () {
    var exportedFunctions = ["build"];
    exportedFunctions.map(function (exportedFunction) {
      return it("should have " + exportedFunction, function () {
        _chai.assert.isOk(_meteor2.default[exportedFunction]);
      });
    });
  });
  describe("build", function () {
    it("should reject if no server param", function (done) {
      process.argv = [];
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      _meteor2.default.build(process.env).catch(function (error) {
        _chai.assert.isOk(error);
        done();
      });
    });
    it("should reject if exec error", function (done) {
      process.argv = ["build", "example.com"];
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      process.env.METEOR_INPUT_DIR = "blahblah";
      _meteor2.default.build(process.env).catch(function (error) {
        _chai.assert.isOk(error);
        done();
      });
    });
    it("should call meteor", function (done) {
      process.argv = ["build", "example.com"];
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      process.env.METEOR_INPUT_DIR = ".";
      _meteor2.default.build(process.env).then(function (result) {
        _chai.assert.equal(result, "built");
        done();
      });
    });
    it("should call meteor with settings", function (done) {
      process.argv = ["build", "example.com", "path/to/settings.json"];
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      process.env.METEOR_INPUT_DIR = ".";
      _meteor2.default.build(process.env).then(function (result) {
        _chai.assert.equal(result, "built");
        done();
      });
    });
    // no arrow syntax to preserve `this`
    // eslint-disable-next-line func-names
    it("should try to open xcode and wait 5 seconds", function (done) {
      this.timeout(6000);
      process.argv = ["build", "example.com", "path/to/settings.json"];
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      process.env.METEOR_INPUT_DIR = ".";
      process.env.XCODE_PROJECT = ".";
      _meteor2.default.build(process.env).then(function (result) {
        _chai.assert.equal(result, "built");
        done();
      });
    });
  });
});
//# sourceMappingURL=meteor.js.map