'use strict';

import { Store } from 'flummox';
import { Map, Record } from 'immutable';

const IssueRecord = Record({id: null, title: null, state: null, user: Record({id: null, login: null})});

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
