#!/usr/bin/env node

import vorpal from "vorpal";

import meteor from "./meteor";
import galaxy from "./galaxy";
import hockey from "./hockey";
import iTunes from "./iTunes";
import android from "./android";
// import play from "./play";
import util from "./util";
import google from "./google";

const Launch = vorpal();

let superEnv;
if (util.launchFile()) {
  superEnv = util.generateSettings(process.env);
}

Launch
  .command("--version", "Ouputs version number")
  .alias("-v")
  .action(() => {
    console.log(util.getVersion());
  });

Launch
  .command("init", "Generates launch.json file for environment vars")
  .action(() => {
    util.init(superEnv)
      .then(result => console.log(result))
      .catch(error => console.log(error.message));
  });

Launch
  .command("import", "Import certificates")
  .action(() => {
    util.importCerts(superEnv)
      .catch(error => console.log(error));
  });

Launch
  .command("build", "Builds the Meteor app in the .build folder")
  .action(() => {
    util.cleanMeteorOutputDir(superEnv)
      .then(meteor.build(superEnv))
      .catch(error => console.log(error));
  });

Launch
  .command("prepare", "Prepares the Android apk files")
  .action(() => {
    android.prepareApk(superEnv)
      .catch(error => console.log(error));
  });

Launch
  .command("hockey", "Deploy to Hockey")
  .action(() => {
    util.addFastfile()
      .then(() => android.prepareApk(superEnv))
      .then(() => hockey.uploadAndroid(superEnv))
      .then(() => hockey.uploadIOS(superEnv))
      .then(() => util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("testflight", "Deploy to TestFlight")
  .action(() => {
    util.addFastfile()
      .then(() => iTunes.uploadTestFlight(superEnv))
      .then(() => util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("appstore", "Deploy to iTunes App Store")
  .action(() => {
    util.addFastfile()
      .then(() => iTunes.uploadAppStore(superEnv))
      .then(() => util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("appstoreDesktop", "Deploy to App Store Connect")
  .action(() => {
    util.addFastfile()
      .then(() => iTunes.uploadAppStoreDesktop(superEnv))
      .then(() => util.removeFastfile())
      .catch(error => console.log(error.message));
  });
  
Launch
  .command("installCerts", "Install apple certificates")
  .action(() => {
    util.addFastfile()
      .then(() => iTunes.installCerts(superEnv))
      .then(() => util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("playstore", "Deploy APK to Google Play Store")
  .option('-a, --amount <channel>', 'upload channel.')
  .action((opt) => {
    android.prepareApk(superEnv, opt.options.amount)
      .then(() => util.addFastfile())
      .then(() => google.uploadAPK(superEnv, opt.options.amount))
      .then(() => util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("production", "Deploy to iTunes and Play")
  .action(() => {
    util.addFastfile()
      .then(() => android.prepareApk(superEnv))
      .then(() => google.uploadAPK(superEnv, 'production'))
      .then(() => iTunes.uploadAppStore(superEnv))
      .then(() => util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("galaxy", "Deploy to Galaxy")
  .action(() => {
    galaxy.deploy(superEnv)
      .catch(error => console.log(error.message));
  });

Launch
  .parse(process.argv);
