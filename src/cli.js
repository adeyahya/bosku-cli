#!/usr/bin/env node
const program = require("commander");
const info = require("../package.json");

// actions
const develop = require('./actions/develop');

program
  .version(info.version)
  .command("develop <projectName>").action(develop)

program.parse(process.argv);