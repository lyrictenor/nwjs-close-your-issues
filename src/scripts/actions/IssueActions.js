'use strict';

import { Actions } from 'flummox';
import uuid from '../utils/uuid';
import Github from 'octonode';

let serverFetchIssues = async function(slug) {
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
  let issues = await require('../../issues.json');
  return issues;
};

let serverCreateIssue = function(slug, issueContent) {

  const newIssue = { id: uuid(), title: issueContent };
  //axios.post(apiendpoint + '/todos', newIssue);

  return newIssue; // passed to the store without awaiting REST response for optimistic add
};

let serverDeleteIssue = function(slug, issue) {
  //axios.delete(apiendpoint + '/todos/' + issue.get('id'));
  return issue; // passed to the store without awaiting REST response for optimistic delete
};

export class IssueActions extends Actions {

  constructor(flux) {
    super();
    this.apiendpoint = flux.getApiendpoint();
    this.slug = flux.getSlug();
  }

  async fetchIssues() {
    return await serverFetchIssues(this.slug);
  }

  createIssue(issueContent) {
    return serverCreateIssue(this.slug, issueContent);
  }

  deleteIssue(issue) {
    return serverDeleteIssue(this.slug, issue);
  }
}
