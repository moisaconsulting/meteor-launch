"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var _rimraf = require("rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _fs = require("fs");

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = _util2.default.generateSettings(process.env);
var outputDir = settings.METEOR_OUTPUT_ABSOLUTE;

// if the meteor version higher than 1.8.0 we we have to change the path apk and it's name 
var meteorVersion = (0, _child_process.execSync)('cat $PWD/.meteor/release').toString('utf8').split('@')[1];
var androidApkPath = void 0,
    androidApkName = void 0;
if (meteorVersion > '1.8.0') {
  androidApkPath = '/android/project/app/build/outputs/apk/release';
  androidApkName = '/app-release-unsigned.apk';
} else {
  androidApkPath = '/android/project/build/outputs/apk/release';
  androidApkName = '/android-release-unsigned.apk';
}

var buildFolder = {
  root: outputDir + "/android",
  crosswalk: outputDir + androidApkPath
};

var unsignedApks = {
  regular: buildFolder.crosswalk + androidApkName,
  crosswalkArmv7: buildFolder.crosswalk + "/android-armv7-release-unsigned.apk",
  crosswalkX86: buildFolder.crosswalk + "/android-x86-release-unsigned.apk"
};

var signedApks = {
  regular: buildFolder.root + "/production.apk",
  crosswalkArmv7: buildFolder.root + "/production-armv7.apk",
  crosswalkX86: buildFolder.root + "/production-x86.apk"
};

var removeApks = function removeApks() {
  console.log("Removing existing apk...");
  Object.keys(signedApks).map(function (apk) {
    return _rimraf2.default.sync(signedApks[apk]);
  });
};

var findCrosswalkApks = function findCrosswalkApks() {
  try {
    (0, _fs.statSync)(unsignedApks.crosswalkArmv7);
    (0, _fs.statSync)(unsignedApks.crosswalkX86);
    return true;
  } catch (error) {
    return false;
  }
};

var getSignCommands = function getSignCommands(isCrosswalk) {
  var signCommand = function signCommand(apkPath) {
    return "\n      jarsigner -verbose         -sigalg SHA1withRSA         -digestalg SHA1         -storepass $ANDROID_STORE_PASS         " + apkPath + "         $ANDROID_KEY\n    ";
  };

  if (isCrosswalk) {
    return [signCommand(unsignedApks.crosswalkArmv7), signCommand(unsignedApks.crosswalkX86)];
  }
  return [signCommand(unsignedApks.regular)];
};

var getAlignCommands = function getAlignCommands(isCrosswalk) {
  var alignCommand = function alignCommand(apkPath, output) {
    return "\n      $ANDROID_ZIPALIGN 4         " + apkPath + "         " + output + "\n    ";
  };

  if (isCrosswalk) {
    return [alignCommand(unsignedApks.crosswalkArmv7, signedApks.crosswalkArmv7), alignCommand(unsignedApks.crosswalkX86, signedApks.crosswalkX86)];
  }
  return [alignCommand(unsignedApks.regular, signedApks.regular)];
};

var prepareApk = function prepareApk(env) {
  return new Promise(function (resolve) {
    if (!_util2.default.hasPlatform("android")) {
      console.log("Skipping Android APK preparation...");
      return resolve("skipped");
    }

    removeApks();

    var isCrosswalk = findCrosswalkApks();

    console.log("Signing Android apk...");
    getSignCommands(isCrosswalk).map(function (command) {
      return (0, _child_process.execSync)(command, {
        stdio: [0, 1, 2],
        env: env
      });
    });

    console.log("Aligning Android apk...");
    getAlignCommands(isCrosswalk).map(function (command) {
      return (0, _child_process.execSync)(command, {
        stdio: [0, 1, 2],
        env: env
      });
    });

    return resolve("prepared");
  });
};

exports.default = {
  prepareApk: prepareApk,
  findCrosswalkApks: findCrosswalkApks,
  signedApks: signedApks
};
//# sourceMappingURL=android.js.map