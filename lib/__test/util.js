"use strict";

var _chai = require("chai");

var _child_process = require("child_process");

var _path = require("path");

var _fs = require("fs");

var _rimraf = require("rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _package = require("../../package.json");

var _util = require("../util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("generateSettings", function () {
  beforeEach(function () {
    delete require.cache[process.cwd() + "/launch.json"];
  });
  it("should return a blank object if no launch file", function () {
    var results = _util2.default.generateSettings({});
    _chai.assert.deepEqual(results, {});
  });
  it("should pass any random env var", function () {
    // eslint-disable-next-line
    (0, _child_process.execSync)("echo '{\"ANDROID_ZIPALIGN\": \"/nonsense\", \"WOW\": \"such\"}' > launch.json");
    var results = _util2.default.generateSettings({});
    _chai.assert.deepEqual(results.WOW, "such");
  });
  describe("ANDROID_ZIPALIGN", function () {
    beforeEach(function () {
      delete process.env.ANDROID_ZIPALIGN;
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{\"ANDROID_ZIPALIGN\": \"/nonsense\"}' > launch.json");
    });
    it("should pass through absolute zipalign path", function () {
      process.env.ANDROID_ZIPALIGN = "/meow";
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.ANDROID_ZIPALIGN, "/meow");
    });
    it("should resolve home zipalign path", function () {
      process.env.ANDROID_ZIPALIGN = "~/meow";
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.ANDROID_ZIPALIGN, process.env.HOME + "/meow");
    });
    it("should resolve relative zipalign path", function () {
      process.env.ANDROID_ZIPALIGN = "../meow";
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.ANDROID_ZIPALIGN, (0, _path.resolve)(process.cwd(), "../meow"));
    });
  });
  describe("METEOR_INPUT_DIR", function () {
    beforeEach(function () {
      delete require.cache[process.cwd() + "/launch.json"];
    });
    it("should be root directory if doesn't exists", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.METEOR_INPUT_DIR, process.cwd());
    });
    it("should be root directory if blank", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{\"METEOR_INPUT_DIR\": \"\"}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.METEOR_INPUT_DIR, process.cwd());
    });
    it("should be absolute path to directory if set", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{\"METEOR_INPUT_DIR\": \"nonsense\"}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.METEOR_INPUT_DIR, (0, _path.resolve)(process.cwd(), "nonsense"));
    });
  });
  describe("METEOR_OUTPUT_DIR", function () {
    beforeEach(function () {
      delete require.cache[process.cwd() + "/launch.json"];
    });
    it("should set as .build if no METEOR_OUTPUT_DIR", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.METEOR_OUTPUT_DIR, ".build");
    });
    it("should set as .build if blank METEOR_OUTPUT_DIR", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{\"METEOR_OUTPUT_DIR\": \"\"}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.METEOR_OUTPUT_DIR, ".build");
    });
    it("should set METEOR_OUTPUT_DIR if in launch.json", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{\"METEOR_OUTPUT_DIR\": \"../nonsense\"}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.METEOR_OUTPUT_DIR, "../nonsense");
    });
  });
  describe("METEOR_OUTPUT_ABSOLUTE", function () {
    beforeEach(function () {
      delete require.cache[process.cwd() + "/launch.json"];
    });
    it("should set as absolute of .build if no METEOR_OUTPUT_DIR", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.METEOR_OUTPUT_ABSOLUTE, process.cwd() + "/.build");
    });
    it("should set as absolute of .build if blank METEOR_OUTPUT_DIR", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{\"METEOR_OUTPUT_DIR\": \"\"}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.METEOR_OUTPUT_ABSOLUTE, process.cwd() + "/.build");
    });
    it("should set absolute of METEOR_OUTPUT_DIR if exists", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{\"METEOR_OUTPUT_DIR\": \"../nonsense\"}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.METEOR_OUTPUT_ABSOLUTE, (0, _path.resolve)(process.cwd(), "..", "nonsense"));
    });
  });
  describe("FL_REPORT_PATH", function () {
    beforeEach(function () {
      delete require.cache[process.cwd() + "/launch.json"];
    });
    it("should use .build by default", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.FL_REPORT_PATH, (0, _path.resolve)(process.cwd(), ".build", "ios"));
    });
    it("should use custom output dir if specified", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{\"METEOR_OUTPUT_DIR\": \"../nonsense\"}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.FL_REPORT_PATH, (0, _path.resolve)(process.cwd(), "..", "nonsense", "ios"));
    });
  });
  describe("XCODE_PROJECT", function () {
    beforeEach(function () {
      delete require.cache[process.cwd() + "/launch.json"];
    });
    it("should use .build by default", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{\"XCODE_SCHEME_NAME\": \"scheme\"}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.XCODE_PROJECT, (0, _path.resolve)(process.cwd(), ".build", "ios", "project", "scheme.xcodeproj"));
    });
    it("should use custom output dir if specified", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{\"XCODE_SCHEME_NAME\": \"scheme\", \"METEOR_OUTPUT_DIR\": \"../nonsense\"}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.XCODE_PROJECT, (0, _path.resolve)(process.cwd(), "..", "nonsense", "ios", "project", "scheme.xcodeproj"));
    });
  });
  describe("SIGH_OUTPUT_PATH", function () {
    beforeEach(function () {
      delete require.cache[process.cwd() + "/launch.json"];
    });
    it("should be the current directory", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.SIGH_OUTPUT_PATH, process.cwd());
    });
  });
  describe("GYM_OUTPUT_DIRECTORY", function () {
    beforeEach(function () {
      delete require.cache[process.cwd() + "/launch.json"];
    });
    it("should be the current directory", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{}' > launch.json");
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.GYM_OUTPUT_DIRECTORY, process.cwd());
    });
  });
  describe("overrides", function () {
    it("should override launch file with env vars", function () {
      // eslint-disable-next-line
      (0, _child_process.execSync)("echo '{\"METEOR_OUTPUT_DIR\": \"something\"}' > launch.json");
      process.env.METEOR_OUTPUT_DIR = "nothing";
      var results = _util2.default.generateSettings(process.env);
      _chai.assert.equal(results.METEOR_OUTPUT_DIR, "nothing");
    });
    afterEach(function () {
      delete process.env.METEOR_OUTPUT_DIR;
    });
  });
}); /* global describe it beforeEach afterEach */

// eslint-disable-next-line

describe("launchFile", function () {
  describe("should short circuit if", function () {
    it("init action", function () {
      process.argv = [null, null, "init"];
      var result = _util2.default.launchFile();
      _chai.assert.isFalse(result);
    });
    it("help action", function () {
      process.argv = [null, null, "help"];
      var result = _util2.default.launchFile();
      _chai.assert.isFalse(result);
    });
    it("no action", function () {
      process.argv = [];
      var result = _util2.default.launchFile();
      _chai.assert.isFalse(result);
    });
    it("checking version", function () {
      process.argv = [null, null, "--version"];
      var result = _util2.default.launchFile();
      _chai.assert.isFalse(result);
    });
    it("checking version shortcut", function () {
      process.argv = [null, null, "-v"];
      var result = _util2.default.launchFile();
      _chai.assert.isFalse(result);
    });
  });
  it("should error if no launch.json");
  it("should return true if launch.json", function () {
    // eslint-disable-next-line
    (0, _child_process.execSync)("echo '{}' > launch.json");
    process.argv = [null, null, "someaction"];
    var result = _util2.default.launchFile();
    _chai.assert.isTrue(result);
  });
});
describe("init", function () {
  it("should create launch.json if doesn't exist", function (done) {
    _util2.default.init().then(function (response) {
      _chai.assert.include(response, "launch.json created. Open it and fill out the vars");
      try {
        (0, _fs.statSync)("launch.json");
        done();
      } catch (error) {
        _chai.assert.fail();
        done();
      }
    });
  });
  it("should do nothing if launch.json exists", function (done) {
    // eslint-disable-next-line
    (0, _child_process.execSync)("echo '{}' > launch.json");
    _util2.default.init().then(function (response) {
      _chai.assert.include(response, "launch.json already exists");
      try {
        (0, _fs.statSync)("launch.json");
        _chai.assert.fail();
        done();
      } catch (error) {
        done();
      }
    });
  });
});
describe("importCerts", function () {
  it("should just work", function (done) {
    process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
    _util2.default.importCerts().then(function (result) {
      _chai.assert.equal(result, "imported");
      done();
    });
  });
});
describe("hasPlatform", function () {
  it("should return true if has platform", function () {
    process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
    var result = _util2.default.hasPlatform("android");
    _chai.assert.isTrue(result);
  });
  it("should return false if doesn't have platform", function () {
    process.env.PATH = process.cwd() + "/src/__test/mocks:" + process.env.PATH;
    var result = _util2.default.hasPlatform("nonplatform");
    _chai.assert.isFalse(result);
  });
});
describe("getVersion", function () {
  it("should return version number", function () {
    var result = _util2.default.getVersion();
    _chai.assert.equal(result, _package.version);
  });
});
describe("cleanMeteorOutputDir", function () {
  it("should remove existing build folder", function (done) {
    _rimraf2.default.sync(".build");
    (0, _child_process.execSync)("mkdir .build && touch .build/test");
    (0, _fs.statSync)(".build/test");
    process.env.METEOR_OUTPUT_DIR = ".build";
    _util2.default.cleanMeteorOutputDir(process.env);
    try {
      (0, _fs.statSync)(".build");
    } catch (error) {
      done();
    }
  });
});
//# sourceMappingURL=util.js.map