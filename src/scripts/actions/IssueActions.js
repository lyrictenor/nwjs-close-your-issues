'use strict';

import { Actions } from 'flummox';
import uuid from 'myUtils/uuid';
import axios from 'axios';
import uriTemplates from 'uri-templates';

let serverFetchIssues = async function(settings) {
  let headers = { 'Accept': 'application/vnd.github.v3.text+json' };
  /* eslint-disable camelcase */
  let config = {
    headers: headers,
    params: {
      state: 'all',
      page: 1,
      per_page: 100,
      sort: 'updated'
    }
  };
  /* eslint-enable camelcase */

  let url;
  if (settings.get('token')) {
    headers.Authorization = `token ${settings.get('token')}`;
    config.params.filter = 'all';
    url = `${settings.get('apiendpoint')}/issues`;
  } else {
    url = `${settings.get('apiendpoint')}/repos/${settings.get('slug')}/issues`;
  }
  const issues = await axios.get(url, config);
  return issues.data;
  //let issues = await require('../../issues.json');
  //return issues;
};

let serverCreateIssue = function(settings, issueContent) {

  const newIssue = { id: uuid(), title: issueContent };
  //axios.post(apiendpoint + '/todos', newIssue);

  return newIssue; // passed to the store without awaiting REST response for optimistic add
};

let serverDeleteIssue = function(settings, issue) {
  //axios.delete(apiendpoint + '/todos/' + issue.get('id'));
  return issue; // passed to the store without awaiting REST response for optimistic delete
};

const toggledIssueState = (state) => {
  return (state === 'open') ? 'closed' : 'open';
};

let serverToggleIssueState = async (settings, issue) => {
  // PATCH /repos/:owner/:repo/issues/:number
  let headers = { 'Accept': 'application/vnd.github.v3.text+json' };
  let data = {
    state: toggledIssueState(issue.get('state'))
  };
  let config = {
    headers: headers
  };

  let url;
  if (settings.get('token')) {
    headers.Authorization = `token ${settings.get('token')}`;
    url = issue.get('url');
  } else {
    // TODO: Handle error
    return issue.toJS();
  }
  // TODO: Handle error
  const updatedIssue = await axios.patch(url, data, config);
  return updatedIssue.data;
};

let serverGetSingleIssue = async (settings, issue) => {
  // GET /repos/:owner/:repo/issues/:number
  let headers = { 'Accept': 'application/vnd.github.v3.text+json' };
  /* eslint-disable camelcase */
  let config = {
    headers: headers
  };
  /* eslint-enable camelcase */

  let url;
  if (settings.get('token')) {
    headers.Authorization = `token ${settings.get('token')}`;
  }
  url = issue.url;
  // TODO: Handle Error
  const updatedIssue = await axios.get(url, config);
  return updatedIssue.data;
};

let serverGetSinglePullRequest = async (settings, issue) => {
  // GET /repos/:owner/:repo/issues/:number
  let headers = { 'Accept': 'application/vnd.github.v3.text+json' };
  /* eslint-disable camelcase */
  let config = {
    headers: headers
  };
  /* eslint-enable camelcase */

  if (settings.get('token')) {
    headers.Authorization = `token ${settings.get('token')}`;
  }
  if (!issue.pull_request.url) {
    // TODO: Handle Error
    console.log('issue not pull request');
    console.log(issue);
    return null;
  }
  let url = issue.pull_request.url;
  // TODO: Handle Error
  const updatedPullRequest = await axios.get(url, config);
  return updatedPullRequest.data;
};


let serverMergePullRequest = async (settings, issue) => {
  // PUT /repos/:owner/:repo/pulls/:number/merge
  let headers = { 'Accept': 'application/vnd.github.v3.text+json' };
  let data = {
  };
  let config = {
    headers: headers
  };
  let url;
  if (settings.get('token')) {
    headers.Authorization = `token ${settings.get('token')}`;
    url = `${issue.pull_request.url}/merge`;
  } else {
    // TODO: Handle Error
    return issue.toJS();
  }
  // TODO: Handle Error
  const response = await axios.put(url, data, config);
  if (response.data.merged !== true) {
    // TODO: Handle Error
    console.log(response.data.message);
    return issue.toJS();
  }
  // TODO: Handle Error
  return await serverGetSingleIssue(settings, issue);
};

let serverDeleteBranch = async (settings, issue) => {
  // TODO: Handle Error
  const pullRequest = await serverGetSinglePullRequest(settings, issue);
  if (pullRequest === null) {
    return issue.toJS();
  }

  const headRef = pullRequest.head.ref;
  const refTemplate = pullRequest.head.repo.git_refs_url;
  if (!headRef || !refTemplate) {
    return issue.toJS();
  }

  // DELETE /repos/:owner/:repo/git/refs/:ref
  // DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a
  let headers = { 'Accept': 'application/vnd.github.v3.text+json' };
  let config = {
    headers: headers
  };
  const template = uriTemplates(refTemplate);
  let url;
  if (settings.get('token')) {
    headers.Authorization = `token ${settings.get('token')}`;
    url = template.fill({ sha: `heads/${headRef}`});
  } else {
    // TODO: Handle Error
    return issue.toJS();
  }
  // TODO: Handle Error
  const response = await axios.delete(url, config);
  console.log(response);
  // TODO: Handle Error
  return await serverGetSingleIssue(settings, issue);
};


export class IssueActions extends Actions {

  constructor(flux) {
    super();
    this.flux = flux;
  }

  fetchSettings() {
    return this.flux.getStore('config').getSettings();
  }

  async fetchIssues() {
    const settings = this.fetchSettings();
    return await serverFetchIssues(settings);
  }

  clearIssues() {
    const settings = this.fetchSettings();
    return true;
  }

  createIssue(issueContent) {
    const settings = this.fetchSettings();
    return serverCreateIssue(settings, issueContent);
  }

  deleteIssue(issue) {
    const settings = this.fetchSettings();
    return serverDeleteIssue(settings, issue);
  }

  async toggleIssueState(issue) {
    const settings = this.fetchSettings();
    return await serverToggleIssueState(settings, issue);
  }

  async mergePullRequest(issue) {
    const settings = this.fetchSettings();
    return await serverMergePullRequest(settings, issue);
  }

  async deleteBranch(issue) {
    const settings = this.fetchSettings();
    return await serverDeleteBranch(settings, issue);
  }
}
