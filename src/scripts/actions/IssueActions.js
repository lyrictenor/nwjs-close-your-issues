'use strict';

import { Actions } from 'flummox';
import uuid from 'myUtils/uuid';
import axios from 'axios';

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
}
