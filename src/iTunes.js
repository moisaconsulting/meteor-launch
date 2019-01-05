import { execSync } from "child_process";
import util from "./util";

const uploadTestFlight = env => (
  new Promise((resolve) => {
    if (!util.hasPlatform("ios")) {
      console.log("Skipping iOS upload to TestFlight...");
      return resolve("skipped");
    }

    console.log("Uploading iOS to TestFlight...");

    execSync("fastlane ios beta", {
      stdio: [0, 1, 2],
      env,
    });

    return resolve("uploaded");
  })
);

const uploadAppStore = env => (
  new Promise((resolve) => {
    if (!util.hasPlatform("ios")) {
      console.log("Skipping iOS upload to iTunes...");
      return resolve("skipped");
    }

    console.log("Uploading to iTunes...");

    execSync("fastlane ios deploy", {
      stdio: [0, 1, 2],
      env,
    });

    return resolve("uploaded");
  })
);

const uploadAppStoreDesktop = env => (
  new Promise((resolve) => {
    console.log("Uploading to App store connect...");

    execSync("fastlane mac deploy_desktop", {
      stdio: [0, 1, 2],
      env,
    });

    return resolve("uploaded");
  })
);

const installCerts = env => (
  new Promise((resolve) => {
    if (!util.hasPlatform("ios")) {
      console.log("Skipping installing certifications for non iOS platform ...");
      return resolve("skipped");
    }

    console.log("Installing certifications ...");

    execSync("fastlane ios install_certs", {
      stdio: [0, 1, 2],
      env,
    });

    return resolve("installed");
  })
);

export default {
  uploadTestFlight,
  uploadAppStore,
  uploadAppStoreDesktop,
  installCerts
};
