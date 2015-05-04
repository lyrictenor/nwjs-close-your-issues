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

// https://developer.github.com/v3/issues/#edit-an-issue
// PATCH /repos/:owner/:repo/issues/:number
const serverEditIssue = async (url, data, config) => {
  return await axios.patch(url, data, config);
};

const toggledIssueState = (state) => {
  return (state === "open") ? "closed" : "open";
};

// PUT /repos/:owner/:repo/pulls/:number/merge
let serverMergePullRequest = async (settings, issue) => {
  if(!settings.get("token")) {
    return issue.toJS();
  }

  let config = defaultConfig(settings.get("token"));
  let data = {};

  // Merge action
  const mergeUrl = `${issue.pull_request.url}/merge`;
  // TODO: Handle Error
  const response = await axios.put(mergeUrl, data, config);
  if (response.data.merged !== true) {
    // TODO: Handle Error
    console.log(response.data.message);
    return issue.toJS();
  }

  const issueUrl = issue.url;
  // TODO: Handle Error
  return await axios.get(issueUrl, config);

};

let serverDeleteBranch = async (settings, issue) => {
  if(!settings.get("token")) {
    return issue.toJS();
  }

  // TODO: Handle Error
  let config = defaultConfig(settings.get("token"));
  if (!issue.pull_request.url) {
    return issue.toJS();
  }
  let pullRequestUrl = issue.pull_request.url;
  const response = await axios.get(pullRequestUrl, config);

  const pullRequest = response.data;

  const headRef = pullRequest.head.ref;
  const refTemplate = pullRequest.head.repo.git_refs_url;
  if (!headRef || !refTemplate) {
    return issue.toJS();
  }

  // DELETE /repos/:owner/:repo/git/refs/:ref
  // DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a
  const template = uriTemplates(refTemplate);
  let url = template.fill({ sha: `heads/${headRef}` });

  // Delete branch
  // TODO: Handle Error
  await axios.delete(url, config);

  const issueUrl = issue.url;
  // TODO: Handle Error
  return await axios.get(issueUrl, config);
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
    let config = defaultConfig(settings.get("token"));
    /* eslint-disable camelcase */
    config.params = {
      state: "all",
      page: 1,
      per_page: 100,
      sort: "updated"
    };
    /* eslint-enable camelcase */

    // TODO: Use apiendpoint reposepnse
    let url;
    if (settings.get("token")) {
      config.params.filter = "all";
      url = `${settings.get("apiendpoint")}/issues`;
    } else {
      url = `${settings.get("apiendpoint")}/repos/${settings.get("slug")}/issues`;
    }
    const response = await serverListIssues(url, config);
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
    if (!settings.get("token")) {
      return issue.toJS();
    }

    let config = defaultConfig(settings.get("token"));
    let data = {
      state: toggledIssueState(issue.get("state"))
    };

    let url = issue.get("url");
    const response = await serverEditIssue(url, data, config);
    return response.data;
  }

  async mergePullRequest(issue) {
    const settings = this.fetchSettings();
    const response = await serverMergePullRequest(settings, issue);
    return response.data;
  }

  async deleteBranch(issue) {
    const settings = this.fetchSettings();
    const response = await serverDeleteBranch(settings, issue);
    return response.data;
  }
}
