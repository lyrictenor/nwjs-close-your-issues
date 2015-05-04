"use strict";

import { Actions } from "flummox";
import axios from "axios";
import uriTemplates from "uri-templates";

const defaultConfig = (token) => {
  if (token) {
    return {
      headers: {
        Accept: "application/vnd.github.v3.text+json",
        Authorization: `token ${token}`
      }
    };
  } else {
    return {
      headers: {
        Accept: "application/vnd.github.v3.text+json"
      }
    };
  }
};

// https://developer.github.com/v3/issues/#list-issues
// GET /issues
const serverListIssues = async (url, config) => {
  return await axios.get(url, config);
};

const serverFetchIssues = async function(settings) {
  let config = defaultConfig(settings.get("token"));
  /* eslint-disable camelcase */
  config.params = {
    state: "all",
    page: 1,
    per_page: 100,
    sort: "updated"
  };
  /* eslint-enable camelcase */

  let url;
  if (settings.get("token")) {
    config.params.filter = "all";
    url = `${settings.get("apiendpoint")}/issues`;
  } else {
    url = `${settings.get("apiendpoint")}/repos/${settings.get("slug")}/issues`;
  }
  return await serverListIssues(url, config);
};

// https://developer.github.com/v3/issues/#edit-an-issue
// PATCH /repos/:owner/:repo/issues/:number
const serverEditIssue = async (url, data, config) => {
  return await axios.patch(url, data, config);
};

const toggledIssueState = (state) => {
  return (state === "open") ? "closed" : "open";
};

const serverToggleIssueState = async (settings, issue) => {
  let config = defaultConfig(settings.get("token"));
  let data = {
    state: toggledIssueState(issue.get("state"))
  };

  if (!settings.get("token")) {
    // TODO: Handle error
    return issue.toJS();
  }
  let url = issue.get("url");
  return await serverEditIssue(url, data, config);
};

// GET /repos/:owner/:repo/issues/:number
const serverGetSingleIssue = async (settings, issue) => {
  let config = defaultConfig(settings.get("token"));
  const url = issue.url;
  // TODO: Handle Error
  return await axios.get(url, config);
};

let serverGetSinglePullRequest = async (settings, issue) => {
  // GET /repos/:owner/:repo/issues/:number
  let headers = { Accept: "application/vnd.github.v3.text+json" };
  /* eslint-disable camelcase */
  let config = {
    headers: headers
  };
  /* eslint-enable camelcase */

  if (settings.get("token")) {
    headers.Authorization = `token ${settings.get("token")}`;
  }
  if (!issue.pull_request.url) {
    // TODO: Handle Error
    return null;
  }
  let url = issue.pull_request.url;
  // TODO: Handle Error
  const updatedPullRequest = await axios.get(url, config);
  return updatedPullRequest.data;
};


let serverMergePullRequest = async (settings, issue) => {
  // PUT /repos/:owner/:repo/pulls/:number/merge
  let headers = { Accept: "application/vnd.github.v3.text+json" };
  let data = {
  };
  let config = {
    headers: headers
  };
  let url;
  if (settings.get("token")) {
    headers.Authorization = `token ${settings.get("token")}`;
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
  const responseIssue = await serverGetSingleIssue(settings, issue);
  return responseIssue.data;
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
  let headers = { Accept: "application/vnd.github.v3.text+json" };
  let config = {
    headers: headers
  };
  const template = uriTemplates(refTemplate);
  let url;
  if (settings.get("token")) {
    headers.Authorization = `token ${settings.get("token")}`;
    url = template.fill({ sha: `heads/${headRef}`});
  } else {
    // TODO: Handle Error
    return issue.toJS();
  }
  // TODO: Handle Error
  const response = await axios.delete(url, config);
  // TODO: Handle Error
  const responseIssue = await serverGetSingleIssue(settings, issue);
  return responseIssue.data;
};


export class IssueActions extends Actions {

  constructor(flux) {
    super();
    this.flux = flux;
  }

  fetchSettings() {
    return this.flux.getStore("config").getSettings();
  }

  async fetchIssues() {
    const settings = this.fetchSettings();
    const response = await serverFetchIssues(settings);
    return response.data;
  }

  clearIssues() {
    //const settings = this.fetchSettings();
    return true;
  }

  deleteIssue(issue) {
    return issue;
  }

  async toggleIssueState(issue) {
    const settings = this.fetchSettings();
    const response = await serverToggleIssueState(settings, issue);
    return response.data;
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
