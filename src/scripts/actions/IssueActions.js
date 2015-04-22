'use strict';

import { Actions } from 'flummox';
import uuid from '../utils/uuid';

let serverFetchIssues = async function(apiendpoint) {
    let issues = await require('../../issues.json');
    return issues;
};

let serverCreateIssue = function(apiendpoint, issueContent) {

    const newIssue = { id: uuid(), title: issueContent };
    //axios.post(apiendpoint + '/todos', newIssue);

    return newIssue; // passed to the store without awaiting REST response for optimistic add
};

let serverDeleteIssue = function(apiendpoint, issue) {
    //axios.delete(apiendpoint + '/todos/' + issue.get('id'));
    return issue; // passed to the store without awaiting REST response for optimistic delete
};

export class IssueActions extends Actions {

    constructor(apiendpoint) {
        super();
        this.apiendpoint = apiendpoint;
    }

    async fetchIssues() {
        return await serverFetchIssues(this.apiendpoint);
    }

    createIssue(issueContent) { return serverCreateIssue(this.apiendpoint, issueContent); }

    deleteIssue(issue) { return serverDeleteIssue(this.apiendpoint, issue); }
}