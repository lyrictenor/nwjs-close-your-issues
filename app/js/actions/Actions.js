import { Action } from 'material-flux';
import Github from 'octonode';
var fs = require('fs');

export var keys = {
};

function getCurrentIssues() {
  return new Promise((resolve, reject) => {
    let issues = JSON.parse(fs.readFileSync(__dirname + '/../../issues.json', 'utf8'));
    resolve(issues);
  });
}

export default class AppAction extends Action {

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
    });
  }
}
