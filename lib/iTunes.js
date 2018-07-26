"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadTestFlight = function uploadTestFlight(env) {
  return new Promise(function (resolve) {
    if (!_util2.default.hasPlatform("ios")) {
      console.log("Skipping iOS upload to TestFlight...");
      return resolve("skipped");
    }

    console.log("Uploading iOS to TestFlight...");

    (0, _child_process.execSync)("fastlane ios beta", {
      stdio: [0, 1, 2],
      env: env
    });

    return resolve("uploaded");
  });
};

var uploadAppStore = function uploadAppStore(env) {
  return new Promise(function (resolve) {
    if (!_util2.default.hasPlatform("ios")) {
      console.log("Skipping iOS upload to iTunes...");
      return resolve("skipped");
    }

    console.log("Uploading to iTunes...");

    (0, _child_process.execSync)("fastlane ios deploy", {
      stdio: [0, 1, 2],
      env: env
    });

    return resolve("uploaded");
  });
};

var uploadAppStoreDesktop = function uploadAppStoreDesktop(env) {
  return new Promise(function (resolve) {
    console.log("Uploading to App store connect...");

    (0, _child_process.execSync)("fastlane macos deploy_desktop", {
      stdio: [0, 1, 2],
      env: env
    });

    return resolve("uploaded");
  });
};

exports.default = {
  uploadTestFlight: uploadTestFlight,
  uploadAppStore: uploadAppStore,
  uploadAppStoreDesktop: uploadAppStoreDesktop
};
//# sourceMappingURL=iTunes.js.map