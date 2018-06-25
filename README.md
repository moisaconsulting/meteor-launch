# Meteor Launch

[![npm version](https://badge.fury.io/js/meteor-launch.svg)](https://badge.fury.io/js/meteor-launch)
[![Build Status](https://travis-ci.org/NewSpring/meteor-launch.svg?branch=master)](https://travis-ci.org/NewSpring/meteor-launch)
[![Coverage Status](https://coveralls.io/repos/github/NewSpring/meteor-launch/badge.svg?branch=tests)](https://coveralls.io/github/NewSpring/meteor-launch?branch=master)
[![Join the chat at https://gitter.im/NewSpring/meteor-launch](https://badges.gitter.im/NewSpring/meteor-launch.svg)](https://gitter.im/NewSpring/meteor-launch?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Automating meteor builds to the AppStore, TestFlight, Hockey, Google Play, and more later.

## Sample

```
$ launch build myapp.com
$ launch galaxy myapp.com
$ launch testflight
```

## Documentation

- [Docs site](http://newspring.github.io/meteor-launch/)
- [Sample project](https://github.com/NewSpring/launch-basic-example)
- [Sample project 2](https://github.com/NewSpring/launch-todos-example)
- [Sample project 3](https://github.com/NewSpring/launch-crosswalk-example)

## Google play channel

- you can upload to this google channels: `beta`, `alpha`, `production` or `rollout`;
- how to use? just run a command ```launch playstore -a 'channels name'```;
- example: ```launch playstore -a beta```