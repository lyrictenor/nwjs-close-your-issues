'use strict';
import { Actions } from 'flummox';
import Github from 'octonode';
var fs = require('fs');

function getCurrentIssues() {
  return new Promise((resolve, reject) => {
    let issues = JSON.parse(fs.readFileSync(__dirname + '/../../issues.json', 'utf8'));
    resolve(issues);
  });
}

export default class IssueActions extends Actions {

  getIssues() {
    //let client = Github.client();
    //client
    //  .repo('sanemat/nwjs-close-your-issues')
    //  .issues({
    //    page: 1,
    //    per_page: 100,
    //    state: 'open'
    //  },
    //  (err, body, header) => {
    //    body;
    //  });
    getCurrentIssues().then((issues) => {
      return issues;
    });
  }
}
