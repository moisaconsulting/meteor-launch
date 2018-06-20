"use strict";

var _chai = require("chai");

var _launch = require("../../assets/launch.json");

var _launch2 = _interopRequireDefault(_launch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it */

// eslint-disable-next-line
var launchSettings = ["METEOR_INPUT_DIR", "METEOR_OUTPUT_DIR", "XCODE_SCHEME_NAME", "APP_IDENTIFIER", "APPLE_ID", "FASTLANE_PASSWORD", "KEYCHAIN_PASSWORD", "CERT_KEY_PATH", "CERT_PASSWORD", "SLACK_URL", "SLACK_ROOM", "ANDROID_KEY", "ANDROID_STORE_PASS", "ANDROID_ZIPALIGN", "IOS_HOCKEY_TOKEN", "ANDROID_HOCKEY_TOKEN", "ANDROID_HOCKEY_ID", "PLAY_AUTH_FILE", "GALAXY_DEPLOY_HOSTNAME", "GALAXY_SESSION_FILE"];

describe("launch.json", function () {
  launchSettings.map(function (setting) {
    return it("has " + setting, function () {
      _chai.assert.isTrue(Object.keys(_launch2.default).indexOf(setting) > -1);
    });
  });
});
//# sourceMappingURL=launch.js.map