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
const serverEditIssue = async (issueUrl, data, config) => {
  return await axios.patch(issueUrl, data, config);
};

const toggledIssueState = (state) => {
  return (state === "open") ? "closed" : "open";
};

// https://developer.github.com/v3/issues/#get-a-single-issue
// GET /repos/:owner/:repo/issues/:number
const serverGetSingleIssue = async (issueUrl, config) => {
  return await axios.get(issueUrl, config);
};

// https://developer.github.com/v3/pulls/#merge-a-pull-request-merge-button
// PUT /repos/:owner/:repo/pulls/:number/merge
const serverMergePullRequest = async (pullRequestUrl, data, config) => {
  const apiUrl = `${pullRequestUrl}/merge`;
  return await axios.put(apiUrl, data, config);
};

// https://developer.github.com/v3/pulls/#get-a-single-pull-request
// GET /repos/:owner/:repo/pulls/:number
const serverGetSinglePullRequest = async (pullRequestUrl, config) => {
  return await axios.get(pullRequestUrl, config);
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
    if(!settings.get("token") || !issue.pull_request.url || !issue.url) {
      return issue.toJS();
    }

    let config = defaultConfig(settings.get("token"));
    let data = {};
    const issueUrl = issue.url;
    const pullRequestUrl = issue.pull_request.url;

    const mergeResponse = await serverMergePullRequest(pullRequestUrl, data, config);
    if (mergeResponse.data.merged !== true) {
      // TODO: Handle Error
      console.log(mergeResponse.data.message);
      return issue.toJS();
    }

    const response = await serverGetSingleIssue(issueUrl, config);
    return response.data;
  }

  async deleteIssueBranch(issue) {
    const settings = this.fetchSettings();
    if(!settings.get("token")) {
      return issue.toJS();
    }

    // TODO: Handle Error
    let config = defaultConfig(settings.get("token"));
    if (!issue.pull_request.url) {
      return issue.toJS();
    }
    let pullRequestUrl = issue.pull_request.url;
    const response = await serverGetSinglePullRequest(pullRequestUrl, config);

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
    const response2 = await serverGetSingleIssue(issueUrl, config);
    return response2.data;
  }
}
