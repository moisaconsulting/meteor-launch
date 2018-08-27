#!/usr/bin/env node
"use strict";

var _vorpal = require("vorpal");

var _vorpal2 = _interopRequireDefault(_vorpal);

var _meteor = require("./meteor");

var _meteor2 = _interopRequireDefault(_meteor);

var _galaxy = require("./galaxy");

var _galaxy2 = _interopRequireDefault(_galaxy);

var _hockey = require("./hockey");

var _hockey2 = _interopRequireDefault(_hockey);

var _iTunes = require("./iTunes");

var _iTunes2 = _interopRequireDefault(_iTunes);

var _android = require("./android");

var _android2 = _interopRequireDefault(_android);

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

var _google = require("./google");

var _google2 = _interopRequireDefault(_google);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import play from "./play";
var Launch = (0, _vorpal2.default)();

var superEnv = void 0;
if (_util2.default.launchFile()) {
  superEnv = _util2.default.generateSettings(process.env);
}

Launch.command("--version", "Ouputs version number").alias("-v").action(function () {
  console.log(_util2.default.getVersion());
});

Launch.command("init", "Generates launch.json file for environment vars").action(function () {
  _util2.default.init(superEnv).then(function (result) {
    return console.log(result);
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("import", "Import certificates").action(function () {
  _util2.default.importCerts(superEnv).catch(function (error) {
    return console.log(error);
  });
});

Launch.command("build", "Builds the Meteor app in the .build folder").action(function () {
  _util2.default.cleanMeteorOutputDir(superEnv).then(_meteor2.default.build(superEnv)).catch(function (error) {
    return console.log(error);
  });
});

Launch.command("prepare", "Prepares the Android apk files").action(function () {
  _android2.default.prepareApk(superEnv).catch(function (error) {
    return console.log(error);
  });
});

Launch.command("hockey", "Deploy to Hockey").action(function () {
  _util2.default.addFastfile().then(function () {
    return _android2.default.prepareApk(superEnv);
  }).then(function () {
    return _hockey2.default.uploadAndroid(superEnv);
  }).then(function () {
    return _hockey2.default.uploadIOS(superEnv);
  }).then(function () {
    return _util2.default.removeFastfile();
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("testflight", "Deploy to TestFlight").action(function () {
  _util2.default.addFastfile().then(function () {
    return _iTunes2.default.uploadTestFlight(superEnv);
  }).then(function () {
    return _util2.default.removeFastfile();
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("appstore", "Deploy to iTunes App Store").action(function () {
  _util2.default.addFastfile().then(function () {
    return _iTunes2.default.uploadAppStore(superEnv);
  }).then(function () {
    return _util2.default.removeFastfile();
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("appstoreDesktop", "Deploy to App Store Connect").action(function () {
  _util2.default.addFastfile().then(function () {
    return _iTunes2.default.uploadAppStoreDesktop(superEnv);
  }).then(function () {
    return _util2.default.removeFastfile();
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("playstore", "Deploy APK to Google Play Store").option('-a, --amount <channel>', 'upload channel.').action(function (opt) {
  _android2.default.prepareApk(superEnv, opt.options.amount).then(function () {
    return _util2.default.addFastfile();
  }).then(function () {
    return _google2.default.uploadAPK(superEnv, opt.options.amount);
  }).then(function () {
    return _util2.default.removeFastfile();
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("production", "Deploy to iTunes and Play").action(function () {
  _util2.default.addFastfile().then(function () {
    return _android2.default.prepareApk(superEnv);
  }).then(function () {
    return _google2.default.uploadAPK(superEnv, 'production');
  }).then(function () {
    return _iTunes2.default.uploadAppStore(superEnv);
  }).then(function () {
    return _util2.default.removeFastfile();
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("galaxy", "Deploy to Galaxy").action(function () {
  _galaxy2.default.deploy(superEnv).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.parse(process.argv);
//# sourceMappingURL=index.js.map