import { execSync } from "child_process";
import rimraf from "rimraf";
import { statSync } from "fs";
import util from "./util";

const settings = util.generateSettings(process.env);
const outputDir = settings.METEOR_OUTPUT_ABSOLUTE;

// if the meteor version higher than 1.8.0 we we have to change the path apk and it's name 
const meteorVersion = execSync("cat $PWD/.meteor/release")
  .toString("utf8")
  .split("@")[1]
  .match(/(\d+)\.(\d+)/);
let androidApkPath,
    androidApkName;
if (((meteorVersion[1] * 100) + (meteorVersion[2] * 1)) >= 108) {
  androidApkPath = '/android/project/app/build/outputs/apk/release';
  androidApkName = '/app-release-unsigned.apk';
} else {
  androidApkPath = '/android/project/build/outputs/apk/release';
  androidApkName = '/android-release-unsigned.apk';
}

const buildFolder = {
  root: `${outputDir}/android`,
  crosswalk: outputDir + androidApkPath,
};

const unsignedApks = {
  regular: buildFolder.crosswalk + androidApkName,
  crosswalkArmv7: `${buildFolder.crosswalk}/android-armv7-release-unsigned.apk`,
  crosswalkX86: `${buildFolder.crosswalk}/android-x86-release-unsigned.apk`,
};

const signedApks = {
  regular: `${buildFolder.root}/production.apk`,
  crosswalkArmv7: `${buildFolder.root}/production-armv7.apk`,
  crosswalkX86: `${buildFolder.root}/production-x86.apk`,
};

const removeApks = () => {
  console.log("Removing existing apk...");
  Object.keys(signedApks).map(apk => (
    rimraf.sync(signedApks[apk])
  ));
};

const findCrosswalkApks = () => {
  try {
    statSync(unsignedApks.crosswalkArmv7);
    statSync(unsignedApks.crosswalkX86);
    return true;
  } catch (error) {
    return false;
  }
};

const getSignCommands = (isCrosswalk) => {
  const signCommand = apkPath => (
    `
      jarsigner -verbose \
        -sigalg SHA1withRSA \
        -digestalg SHA1 \
        -storepass $ANDROID_STORE_PASS \
        ${apkPath} \
        $ANDROID_KEY
    `
  );

  if (isCrosswalk) {
    return [
      signCommand(unsignedApks.crosswalkArmv7),
      signCommand(unsignedApks.crosswalkX86),
    ];
  }
  return [
    signCommand(unsignedApks.regular),
  ];
};

const getAlignCommands = (isCrosswalk) => {
  const alignCommand = (apkPath, output) => (
    `
      $ANDROID_ZIPALIGN 4 \
        ${apkPath} \
        ${output}
    `
  );

  if (isCrosswalk) {
    return [
      alignCommand(unsignedApks.crosswalkArmv7, signedApks.crosswalkArmv7),
      alignCommand(unsignedApks.crosswalkX86, signedApks.crosswalkX86),
    ];
  }
  return [
    alignCommand(unsignedApks.regular, signedApks.regular),
  ];
};

const prepareApk = env => (
  new Promise((resolve) => {
    if (!util.hasPlatform("android")) {
      console.log("Skipping Android APK preparation...");
      return resolve("skipped");
    }

    removeApks();

    const isCrosswalk = findCrosswalkApks();

    console.log("Signing Android apk...");
    getSignCommands(isCrosswalk).map(command => (
      execSync(command, {
        stdio: [0, 1, 2],
        env,
      })
    ));

    console.log("Aligning Android apk...");
    getAlignCommands(isCrosswalk).map(command => (
      execSync(command, {
        stdio: [0, 1, 2],
        env,
      })
    ));

    return resolve("prepared");
  })
);

export default {
  prepareApk,
  findCrosswalkApks,
  signedApks,
};
