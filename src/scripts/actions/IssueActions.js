"use strict";

import { Actions } from "flummox";
import axios from "axios";
import uriTemplates from "uri-templates";
import defaultConfig from "myUtils/githubDefaultConfig";
import serverListIssues from "myUtils/githubListIssues";
import serverEditIssue from "myUtils/githubEditIssue";
import serverGetSingleIssue from "myUtils/githubGetSingleIssue";
import serverMergePullRequest from "myUtils/githubMergePullRequest";
import serverGetSinglePullRequest from "myUtils/githubGetSinglePullRequest";
import serverDeleteRefs from "myUtils/githubDeleteRefs";
import AppError from "myUtils/AppError";

const toggledIssueState = (state) => {
  return (state === "open") ? "closed" : "open";
};

export default class IssueActions extends Actions {

  constructor(flux) {
    super();
    this.flux = flux;
  }

  async fetchIssues() {
    const settings = this.flux.getConfig();
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
    console.log(response);
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
    const settings = this.flux.getConfig();
    if (!settings.get("token")) {
      return issue.toJS();
    }

    let config = defaultConfig(settings.get("token"));
    let data = {
      state: toggledIssueState(issue.get("state"))
    };

    let url = issue.get("url");
    const response = await serverEditIssue(url, data, config);
    console.log(response);
    return response.data;
  }

  async mergePullRequest(issue) {
    const settings = this.flux.getConfig();
    if(!settings.get("token") || !issue.pull_request.url || !issue.url) {
      return issue.toJS();
    }

    let config = defaultConfig(settings.get("token"));
    let data = {};
    const issueUrl = issue.url;
    const pullRequestUrl = issue.pull_request.url;

    const mergeResponse = await serverMergePullRequest(pullRequestUrl, data, config);
    console.log(mergeResponse);
    if (mergeResponse.data.merged !== true) {
      // TODO: Handle Error
      console.log(mergeResponse.data.message);
      return issue.toJS();
    }

    const response = await serverGetSingleIssue(issueUrl, config);
    console.log(response);
    return response.data;
  }

  async deleteIssueBranch(issue) {
    const settings = this.flux.getConfig();
    if(!settings.get("token") || !issue.pull_request.url || !issue.url) {
      return issue.toJS();
    }

    let config = defaultConfig(settings.get("token"));
    const pullRequestUrl = issue.pull_request.url;
    const issueUrl = issue.url;

    const response = await serverGetSinglePullRequest(pullRequestUrl, config);
    console.log(response);

    const pullRequest = response.data;
    const headRef = pullRequest.head.ref;
    const refTemplate = pullRequest.head.repo.git_refs_url;
    if (!headRef || !refTemplate) {
      return issue.toJS();
    }

    // DELETE /repos/:owner/:repo/git/refs/:ref
    // DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a
    const template = uriTemplates(refTemplate);
    const refsUrl = template.fill({ sha: `heads/${headRef}` });

    // Delete branch
    // TODO: Handle Error
    await serverDeleteRefs(refsUrl, config);

    const response2 = await serverGetSingleIssue(issueUrl, config);
    console.log(response2);
    return response2.data;
  }
}
