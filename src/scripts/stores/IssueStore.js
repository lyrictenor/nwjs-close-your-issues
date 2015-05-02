'use strict';

import { Store } from 'flummox';
import { Map, Record } from 'immutable';

/* eslint-disable camelcase */
const IssueRecord = Record({
  id: null,
  url: null,
  html_url: null,
  number: 0,
  title: "",
  labels: [],
  state: null,
  locked: null,
  assignee: null,
  milestone: null,
  comments: 0,
  created_at: null,
  updated_at: null,
  closed_at: null,
  body_text: "",
  user: Record({
    id: null,
    login: null,
    avatar_url: null
  })
});
/* eslint-enable camelcase */

export class IssueStore extends Store {

  constructor(flux) {
    super();

    this.state = { issues: Map() };

    /*
     Registering action handlers
     */

    const issueActionIds = flux.getActionIds('issues');

    this.register(issueActionIds.createIssue, this.createIssue);
    this.register(issueActionIds.fetchIssues, this.fetchIssues);
    this.register(issueActionIds.clearIssues, this.clearIssues);
    this.register(issueActionIds.deleteIssue, this.deleteIssue);
  }
  createIssue(data) {
    const newMap = this.state.issues.set(data.id, new IssueRecord(this.transform(data)));
    this.setState({ issues: newMap });
  }
  fetchIssues(issues) {
    let issuesMap = Map();
    for(let issue of issues) {
      issuesMap = issuesMap.set(issue.id, new IssueRecord(this.transform(issue)));
    }

    this.setState({ issues: this.state.issues.merge(issuesMap) });
  }
  clearIssues() {
    this.setState({ issues: this.state.issues.clear() });
  }
  deleteIssue(issue) {
    let issues = this.state.issues.delete(issue.get('id'));
    if(issues !== this.state.issues) {
      this.setState({ issues: issues });
    }
  }

  transform(issue) {
    let copied = Object.assign({}, issue);
    return copied;
  }

  getIssues() {
    return this.state.issues;
  }
}
