#!/usr/bin/env node
const program = require("commander");
const info = require("../package.json");

// actions
const develop = require('./actions/develop');
const npm = require('./actions/npm');

program
  .version(info.version)
  .command("npm <projectName> [otherProject...]").action(npm)
  .command("develop <projectName>").action(develop)

program.parse(process.argv);