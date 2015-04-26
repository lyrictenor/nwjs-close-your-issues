'use strict';

import { Actions } from 'flummox';
import uuid from '../utils/uuid';
import axios from 'axios';

let serverFetchIssues = async function(endpoint, slug) {
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

  let url = `${endpoint}/repos/${slug}/issues`;
  let issues = await axios.get(url, config);
  return issues.data;
  //let issues = await require('../../issues.json');
  //return issues;
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
    this.flux = flux;

    const config = flux.getStore('config');

    this.apiendpoint = config.getDefaultApiendpoint();
    this.slug = config.getDefaultSlug();
  }

  async fetchIssues() {
    return await serverFetchIssues(this.apiendpoint, this.slug);
  }

  createIssue(issueContent) {
    return serverCreateIssue(this.slug, issueContent);
  }

  deleteIssue(issue) {
    return serverDeleteIssue(this.slug, issue);
  }
}
