"use strict";

var _chai = require("chai");

var _path = require("path");

var _fs = require("fs");

var _child_process = require("child_process");

var _rimraf = require("rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commands = ["init", "import", "build", "prepare", "hockey", "testflight", "appstore", "playstore", "production", "galaxy"]; /* global describe it before beforeEach */

// eslint-disable-next-line


describe("help", function () {
  var output = void 0;

  before(function () {
    var buffer = (0, _child_process.execSync)("launch help");
    output = buffer.toString();
  });

  commands.map(function (command) {
    return it("should have " + command, function () {
      _chai.assert.include(output, command);
    });
  });
});

beforeEach(function () {
  _rimraf2.default.sync("launch.json");
});

describe("init", function () {
  it("should error when no launch.json file", function () {
    var output = (0, _child_process.execSync)("launch build", {
      env: process.env
    });

    _chai.assert.equal(output.toString(), "launch.json not found. Please run: launch init\n");
  });

  it("should return launch message", function () {
    var output = (0, _child_process.execSync)("launch init", {
      env: process.env
    });

    _chai.assert.include(output.toString(), "launch.json created. Open it and fill out the vars\n");
  });

  it("should add launch file", function () {
    (0, _child_process.execSync)("launch init", {
      env: process.env
    });
    var launchFile = (0, _path.join)(process.cwd(), "launch.json");

    (0, _fs.stat)(launchFile, function (err) {
      if (err) {
        _chai.assert.fail();
      } else {
        _chai.assert.isOk();
      }
    });
  });
});
//# sourceMappingURL=actions.js.map