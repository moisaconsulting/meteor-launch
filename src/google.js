import { execSync } from "child_process";
import util from "./util";

const uploadAPK = (env, channel) => (
  new Promise((resolve) => {
    if (!util.hasPlatform("android")) {
      console.log("Skipping APK upload to Google Play Store...");
      return resolve("skipped");
    }

    const channels = ['alpha', 'beta', 'production', 'rollout', 'internal'];

    const test = channels.some(function (el) {
      return el === channel;
    });

    if (!test) channel = 'alpha';

    console.log(`Uploading APK to ${channel}...`);

    execSync(`fastlane android playstore track:${channel}`, {
      stdio: [0, 1, 2],
      env,
    });

    return resolve("uploaded");
  })
);

export default {
  uploadAPK
};