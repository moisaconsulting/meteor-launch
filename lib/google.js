"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadAPK = function uploadAPK(env, channel) {
  return new Promise(function (resolve) {
    if (!_util2.default.hasPlatform("android")) {
      console.log("Skipping APK upload to Google Play Store...");
      return resolve("skipped");
    }

    var channels = ['alpha', 'beta', 'production', 'rollout', 'internal'];

    var test = channels.some(function (el) {
      return el === channel;
    });

    if (!test) channel = 'alpha';

    console.log("Uploading APK to " + channel + "...");

    (0, _child_process.execSync)("fastlane android playstore track:" + channel, {
      stdio: [0, 1, 2],
      env: env
    });

    return resolve("uploaded");
  });
};

exports.default = {
  uploadAPK: uploadAPK
};
//# sourceMappingURL=google.js.map