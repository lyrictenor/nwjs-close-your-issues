"use strict";

import { Store } from "flummox";
import { Map as map, Record as record } from "immutable";
import githubSlug from "myUtils/githubSlug";
import trimWidth from "myUtils/trimWidth";
import cx from "classnames";

/* eslint-disable camelcase */
const issueRecord = record({
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
  body_text_short: "",
  user: record({
    id: null,
    login: null,
    avatar_url: null
  }),
  slug: "",
  card_icon_class: "",
  button_snooze: false,
  button_delete_branch: false,
  button_restore_branch: false,
  button_close_issue: false,
  button_reopen_issue: false,
  button_merge_pull_request: false,
  pull_request: record({
    url: null,
    html_url: null
  })
});
/* eslint-enable camelcase */

const isPullRequest = (issue) => {
  if (typeof issue.pull_request === "undefined" || issue.pull_request === null) {
    return false;
  }
  return Object.keys(issue.pull_request).length !== 0;
};
const isClosed = (issue) => {
  return issue.state === "closed";
};

const switchCardIconClass = (issue) => {
  return cx(
    "octicon",
    { "octicon-issue-opened": !isPullRequest(issue) && !isClosed(issue) },
    { "octicon-issue-closed": !isPullRequest(issue) && isClosed(issue) },
    { "octicon-issue-reopened": false },
    { "octicon-git-pull-request": isPullRequest(issue) },
    { "open": !isClosed(issue) },
    { "merged": false },
    { "closed": isClosed(issue) },
    { "reverted": false },
  );
};

const issueDecorator = (issue) => {
  let copied = Object.assign({}, issue);
  /* eslint-disable camelcase */
  copied.slug = githubSlug(copied.html_url);
  copied.body_text_short = trimWidth(copied.body_text, 100);
  copied.card_icon_class = switchCardIconClass(copied);
  copied.button_snooze = true;
  copied.button_close_issue = !isClosed(copied);
  copied.button_reopen_issue = isClosed(copied);
  copied.button_delete_branch = isPullRequest(copied) && isClosed(copied);
  copied.button_restore_branch = isPullRequest(copied) && isClosed(copied);
  copied.button_merge_pull_request = isPullRequest(copied) && !isClosed(copied);
  /* eslint-enable camelcase */
  return copied;
};

export class IssueStore extends Store {

  constructor(flux) {
    super();

    this.state = { issues: map() };

    /*
     Registering action handlers
     */

    const issueActionIds = flux.getActionIds("issues");

    this.register(issueActionIds.fetchIssues, this.updateMultipleIssues);
    this.register(issueActionIds.clearIssues, this.clearIssues);
    this.register(issueActionIds.deleteIssue, this.deleteIssue);
    this.register(issueActionIds.toggleIssueState, this.updateSingleIssue);
    this.register(issueActionIds.mergePullRequest, this.updateSingleIssue);
    this.register(issueActionIds.deleteBranch, this.updateSingleIssue);
  }
  updateMultipleIssues(issues) {
    let issuesMap = map();
    for(let issue of issues) {
      issuesMap = issuesMap.set(issue.id, issueRecord(issueDecorator(issue)));
    }

    this.setState({ issues: this.state.issues.merge(issuesMap) });
  }
  clearIssues() {
    this.setState({ issues: this.state.issues.clear() });
  }
  deleteIssue(issue) {
    let issues = this.state.issues.delete(issue.get("id"));
    if(issues !== this.state.issues) {
      this.setState({ issues: issues });
    }
  }
  updateSingleIssue(data) {
    this.updateMultipleIssues([data]);
  }

  getIssues() {
    return this.state.issues;
  }
}
