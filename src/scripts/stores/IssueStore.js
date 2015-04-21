'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';

export class IssueStore extends Store {

    constructor(flux) {
        super();

        this.state = { issues: Immutable.Map() };

        class IssueRecord extends Immutable.Record({id: null, title: null}) {
            label() { return this.get('title'); }
        }

        /*
        Registering action handlers
        */

        const issueActionIds = flux.getActionIds('issues');

        this.register(issueActionIds.createIssue, (data) => {
            const newMap = this.state.issues.set(data.id, new IssueRecord(data));
            this.setState({ issues: newMap });
        });

        this.register(issueActionIds.fetchIssues, (issues) => {
            let issuesMap = Immutable.Map();
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
