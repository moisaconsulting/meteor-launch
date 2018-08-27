"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _fs = require("fs");

var _child_process = require("child_process");

var _rimraf = require("rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _underscore = require("underscore");

var _package = require("../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setMeteorInputDir = function setMeteorInputDir(dir) {
  if (typeof dir === "undefined" || dir.length === 0) {
    return process.cwd();
  }
  return (0, _path.resolve)(process.cwd(), dir);
};

var setMeteorOutputDir = function setMeteorOutputDir(dir) {
  if (typeof dir === "undefined" || dir.length === 0) {
    return ".build";
  }
  return dir;
};

var generateSettings = function generateSettings(originalEnv) {
  var launchFile = (0, _path.join)(process.cwd(), "launch.json");
  var launchVars = {};
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    launchVars = require(launchFile);
    // eslint-disable-next-line no-empty
  } catch (error) {
    return {};
  }
  launchVars.METEOR_INPUT_DIR = setMeteorInputDir(launchVars.METEOR_INPUT_DIR);
  launchVars.METEOR_OUTPUT_DIR = setMeteorOutputDir(launchVars.METEOR_OUTPUT_DIR);
  launchVars.METEOR_OUTPUT_ABSOLUTE = (0, _path.resolve)(launchVars.METEOR_OUTPUT_DIR);
  var otherVars = {
    SIGH_OUTPUT_PATH: process.cwd(),
    GYM_OUTPUT_DIRECTORY: process.cwd(),
    FL_REPORT_PATH: (0, _path.join)(process.cwd(), launchVars.METEOR_OUTPUT_DIR),
    XCODE_PROJECT: (0, _path.resolve)(launchVars.METEOR_OUTPUT_DIR, "ios", "project", launchVars.XCODE_SCHEME_NAME + ".xcodeproj")
  };
  var result = (0, _underscore.extend)(launchVars, otherVars, originalEnv);
  // make relative
  return (0, _underscore.extend)(result, {
    ANDROID_ZIPALIGN: result.ANDROID_ZIPALIGN[0] === "~" ? (0, _path.join)(process.env.HOME, result.ANDROID_ZIPALIGN.slice(1)) : (0, _path.resolve)(result.ANDROID_ZIPALIGN)
  });
};

var cleanMeteorOutputDir = function cleanMeteorOutputDir(env) {
  return new Promise(function (resolve) {
    _rimraf2.default.sync(env.METEOR_OUTPUT_DIR);
    return resolve();
  });
};

var init = function init() {
  return new Promise(function (resolve) {
    var launchFile = (0, _path.join)(process.cwd(), "launch.json");
    try {
      (0, _child_process.execSync)("which fastlane");
    } catch (e) {
      /* istanbul ignore next */
      console.log("Installing fastlane...");
      /* istanbul ignore next */
      (0, _child_process.execSync)("sudo gem install fastlane");
    }

    (0, _fs.stat)(launchFile, function (err) {
      // file not found
      if (err) {
        var exampleLaunchFile = (0, _path.join)(__dirname, "../assets/launch.json");
        var targetLaunchFile = (0, _path.join)(process.cwd(), "launch.json");

        var contents = (0, _fs.readFileSync)(exampleLaunchFile);

        (0, _fs.writeFileSync)(targetLaunchFile, contents);

        return resolve("launch.json created. Open it and fill out the vars");
      }

      // dont overwrite
      return resolve("launch.json already exists");
    });
  });
};

var launchFile = function launchFile() {
  // fail silently if trying to init
  if (["init", "help", "--version", "-v"].indexOf(process.argv[2]) > -1 || typeof process.argv[2] === "undefined") return false;

  try {
    (0, _fs.statSync)(process.cwd() + "/launch.json");
  } catch (e) {
    /* istanbul ignore next */
    console.log("launch.json not found. Please run: launch init");
    /* istanbul ignore next */
    process.exit();
  }
  return true;
};

var addFastfile = function addFastfile() {
  return new Promise(function (resolve) {
    var fastfileLocation = (0, _path.join)(__dirname, "..", "fastlane", "Fastfile");
    var fastfileTarget = (0, _path.join)(process.cwd(), ".fastlane");

    try {
      (0, _fs.mkdirSync)(fastfileTarget);
    } catch (e) {
      // do nothing
    }

    var contents = (0, _fs.readFileSync)(fastfileLocation);

    (0, _fs.writeFileSync)(fastfileTarget + "/Fastfile", contents);

    return resolve("Fastfile written...");
  });
};

var removeFastfile = function removeFastfile() {
  return new Promise(function (resolve) {
    var fastfileTarget = (0, _path.join)(process.cwd(), ".fastlane");

    _rimraf2.default.sync(fastfileTarget);

    return resolve("Fastfile deleted...");
  });
};

var importCerts = function importCerts(env) {
  return new Promise(function (resolve) {
    console.log("Importing certs...");
    (0, _child_process.execSync)("fastlane import", {
      stdio: [0, 1, 2],
      env: env
    });
    return resolve("imported");
  });
};

var hasPlatform = function hasPlatform(platform) {
  var platforms = (0, _child_process.execSync)("meteor list-platforms");
  return platforms.toString().indexOf(platform) > -1;
};

var getVersion = function getVersion() {
  return _package.version;
};

exports.default = {
  generateSettings: generateSettings,
  launchFile: launchFile,
  init: init,
  importCerts: importCerts,
  addFastfile: addFastfile,
  removeFastfile: removeFastfile,
  hasPlatform: hasPlatform,
  getVersion: getVersion,
  cleanMeteorOutputDir: cleanMeteorOutputDir
};
//# sourceMappingURL=util.js.map