#!/usr/bin/env node

var package = require("../package.json");
var fs = require("fs");
var changelog = require("conventional-changelog");

changelog(
  {},
  function(err, log) {
    fs.writeFile('CHANGELOG.md', log, function(err){
      console.log(err);
    });
    console.log('Here is your changelog!', log);
  }
);
