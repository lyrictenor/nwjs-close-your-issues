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

        this.register(issueActionIds.createIssue, (data) => {
            const newMap = this.state.issues.set(data.id, new IssueRecord(data));
            this.setState({ issues: newMap });
        });

        this.register(issueActionIds.fetchIssues, (issues) => {
            let issuesMap = Map();
            for(let issue of issues) {
                issuesMap = issuesMap.set(issue.id, new IssueRecord(issue));
            }

            this.setState({ issues: this.state.issues.merge(issuesMap) });
        });

        this.register(issueActionIds.deleteIssue, (issue) => {
            let issues = this.state.issues.delete(issue.get('id'));
            if(issues !== this.state.issues) { this.setState({ issues: issues }); }
        });
    }

    getIssues() { return this.state.issues; }
}
