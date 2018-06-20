"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var deploy = function deploy(env) {
  return new Promise(function (resolve, reject) {
    var meteorServer = process.argv[1];

    if (meteorServer === undefined) {
      return reject("Please provide a server as the second argument");
    }

    var deployCommand = "\n      DEPLOY_HOSTNAME=$GALAXY_DEPLOY_HOSTNAME       METEOR_SESSION_FILE=$GALAXY_SESSION_FILE       meteor deploy " + meteorServer;
    if (process.argv[2]) {
      deployCommand += " --settings " + process.argv[2];
    }

    try {
      console.log("Deploying to Galaxy...");
      (0, _child_process.execSync)(deployCommand, {
        stdio: [0, 1, 2],
        env: env
      });
    } catch (error) {
      return reject(error);
    }

    return resolve("deployed");
  });
};

exports.default = {
  deploy: deploy
};
//# sourceMappingURL=galaxy.js.map