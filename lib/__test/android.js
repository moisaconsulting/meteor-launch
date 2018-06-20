"use strict";

var _chai = require("chai");

var _child_process = require("child_process");

var _path = require("path");

var _rimraf = require("rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _android = require("../android");

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("android", function () {
  describe("exported functions", function () {
    var exportedFunctions = ["prepareApk", "findCrosswalkApks", "signedApks"];
    exportedFunctions.map(function (exportedFunction) {
      return it("should have " + exportedFunction, function () {
        _chai.assert.isOk(_android2.default[exportedFunction]);
      });
    });
  });
  describe("prepareApk", function () {
    it("should do nothing if no android platform", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks/ios:" + process.env.PATH;
      _android2.default.prepareApk(process.env).then(function (result) {
        _chai.assert.equal(result, "skipped");
        done();
      });
    });
    it("should call jarsigner and align", function (done) {
      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      process.env.ANDROID_ZIPALIGN = process.cwd() + "/src/__test/mocks/align";
      _android2.default.prepareApk(process.env).then(function (result) {
        _chai.assert.equal(result, "prepared");
        done();
      });
    });
    it("should handle crosswalk builds", function (done) {
      var crosswalkOutputPath = (0, _path.resolve)(process.cwd(), "undefined", "android", "project", "build", "outputs", "apk");
      (0, _child_process.execSync)("mkdir -p " + crosswalkOutputPath);
      (0, _child_process.execSync)("touch " + crosswalkOutputPath + "/android-armv7-release-unsigned.apk");
      (0, _child_process.execSync)("touch " + crosswalkOutputPath + "/android-x86-release-unsigned.apk");

      process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
      process.env.ANDROID_ZIPALIGN = process.cwd() + "/src/__test/mocks/align";
      _android2.default.prepareApk(process.env).then(function (result) {
        _chai.assert.equal(result, "prepared");
        done();
      });
    });
    after(function () {
      _rimraf2.default.sync(process.cwd() + "/undefined");
    });
  });
}); /* global describe it before after */

// eslint-disable-next-line
//# sourceMappingURL=android.js.map