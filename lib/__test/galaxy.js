"use strict";

var _chai = require("chai");

var _galaxy = require("../galaxy");

var _galaxy2 = _interopRequireDefault(_galaxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it */

// eslint-disable-next-line
describe("galaxy", function () {
  describe("exported functions", function () {
    var exportedFunctions = ["deploy"];
    exportedFunctions.map(function (exportedFunction) {
      return it("should have " + exportedFunction, function () {
        _chai.assert.isOk(_galaxy2.default[exportedFunction]);
      });
    });
  });
  describe("deploy", function () {
    it("should reject if no server", function (done) {
      process.argv = [];
      _galaxy2.default.deploy().then(function () {
        _chai.assert.fail();
        done();
      }).catch(function (error) {
        _chai.assert.equal(error, "Please provide a server as the second argument");
        done();
      });
    });
    it("should reject if meteor CLI error", function (done) {
      process.argv = ["deploy", "example.com"];
      _galaxy2.default.deploy().then(function () {
        _chai.assert.fail();
        done();
      }).catch(function (error) {
        _chai.assert.isOk(error);
        done();
      });
    });
    it("should call meteor to deploy", function (done) {
      process.argv = ["deploy", "example.com"];
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      _galaxy2.default.deploy().then(function (result) {
        _chai.assert.equal(result, "deployed");
        done();
      }).catch(function () {
        _chai.assert.fail();
        done();
      });
    });
    it("should call meteor with settings", function (done) {
      process.argv = ["deploy", "example.com", "path/to/settting.json"];
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      _galaxy2.default.deploy().then(function (result) {
        _chai.assert.equal(result, "deployed");
        done();
      }).catch(function () {
        _chai.assert.fail();
        done();
      });
    });
  });
});
//# sourceMappingURL=galaxy.js.map