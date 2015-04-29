'use strict';

import { Actions } from 'flummox';
import uuid from '../utils/uuid';
import axios from 'axios';

let serverFetchIssues = async function(settings) {
  const headers = { 'Accept': 'application/vnd.github.v3.text+json' };
  /* eslint-disable camelcase */
  let config = {
    headers: headers,
    params: {
      state: 'open',
      page: 1,
      per_page: 100
    }
  };
  /* eslint-enable camelcase */

  let url = `${settings.apiendpoint}/repos/${settings.slug}/issues`;
  let issues = await axios.get(url, config);
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

export class IssueActions extends Actions {

  constructor(flux) {
    super();
    this.flux = flux;
  }

  fetchSettings() {
    const config = this.flux.getStore('config');
    this.settings = config.getSettings();
  }

  async fetchIssues() {
    this.fetchSettings();
    return await serverFetchIssues(this.settings);
  }

  clearIssues() {
    this.fetchSettings();
    return true;
  }

  createIssue(issueContent) {
    this.fetchSettings();
    return serverCreateIssue(this.settings, issueContent);
  }

  deleteIssue(issue) {
    this.fetchSettings();
    return serverDeleteIssue(this.settings, issue);
  }
}
