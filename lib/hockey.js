"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var _android = require("./android");

var _android2 = _interopRequireDefault(_android);

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadIOS = function uploadIOS(env) {
  return new Promise(function (resolve) {
    if (!_util2.default.hasPlatform("ios")) {
      console.log("Skipping iOS upload to Hockey...");
      return resolve("skipped");
    }

    console.log("Uploading iOS to Hockey...");

    (0, _child_process.execSync)("fastlane ios hockey", {
      stdio: [0, 1, 2],
      env: env
    });

    return resolve("uploaded");
  });
};

var uploadAndroid = function uploadAndroid(env) {
  return new Promise(function (resolve) {
    if (!_util2.default.hasPlatform("android")) {
      console.log("Skipping Android upload to Hockey...");
      return resolve("skipped");
    }

    var getCommand = function getCommand(path) {
      return "\n        curl -F \"status=2\"           -F \"notify=0\"           -F \"ipa=@" + path + "\"           -H \"X-HockeyAppToken: $ANDROID_HOCKEY_TOKEN\"           https://rink.hockeyapp.net/api/2/apps/" + env.ANDROID_HOCKEY_ID + "/app_versions/upload\n      ";
    };

    console.log("Uploading Android to Hockey...");

    var isCrosswalk = _android2.default.findCrosswalkApks();

    var commands = isCrosswalk ? [getCommand(_android2.default.signedApks.crosswalkArmv7), getCommand(_android2.default.signedApks.crosswalkX86)] : [getCommand(_android2.default.signedApks.regular)];

    commands.map(function (command) {
      return (0, _child_process.execSync)(command, {
        stdio: [0, 1, 2],
        env: env
      });
    });

    return resolve("uploaded");
  });
};

exports.default = {
  uploadIOS: uploadIOS,
  uploadAndroid: uploadAndroid
};
//# sourceMappingURL=hockey.js.map