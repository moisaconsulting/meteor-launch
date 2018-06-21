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

var uploadPlayStore = function uploadPlayStore(env) {
  return new Promise(function (resolve) {
    if (!_util2.default.hasPlatform("android")) {
      console.log("Skipping Android upload to Play Store...");
      return resolve("skipped");
    }

    try {
      (0, _child_process.execSync)("which playup");
    } catch (e) {
      /* istanbul ignore next */
      console.log("Installing playup...");
      /* istanbul ignore next */
      (0, _child_process.execSync)("npm install -g git+https://github.com/smartcrm/playup");
    }

    var getCommand = function getCommand(path) {
      return "\n        playup           --auth $PLAY_AUTH_FILE           " + path + "\n      ";
    };

    console.log("Uploading to Google Play Store...");

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
  uploadPlayStore: uploadPlayStore
};
//# sourceMappingURL=play.js.map