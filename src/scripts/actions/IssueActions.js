"use strict";

import { Actions } from "flummox";
import axios from "axios";
import uriTemplates from "uri-templates";
import defaultConfig from "myUtils/githubDefaultConfig";
import serverListIssues from "myUtils/githubListIssues";
import serverListIssuesForRepository from "myUtils/githubListIssuesForRepository";
import serverEditIssue from "myUtils/githubEditIssue";
import serverGetSingleIssue from "myUtils/githubGetSingleIssue";
import serverMergePullRequest from "myUtils/githubMergePullRequest";
import serverGetSinglePullRequest from "myUtils/githubGetSinglePullRequest";
import serverGetSingleRepository from "myUtils/githubGetSingleRepository";
import serverDeleteRefs from "myUtils/githubDeleteRefs";
import serverRootEndpoint from "myUtils/githubRootEndpoint";
import AppError from "myUtils/AppError";

const toggledIssueState = (state) => {
  return (state === "open") ? "closed" : "open";
};

export default class IssueActions extends Actions {

  constructor(flux) {
    super();
    this.flux = flux;
  }

  async fetchSlugRepositoryIssues(owner, repo) {
    const settings = this.flux.getConfig();
    let config = defaultConfig(settings.get("token"));

    // endpoint
    const endpointResponse = await serverRootEndpoint(settings.get("apiendpoint"), config);

    // repository
    const repositoryTemplate = uriTemplates(endpointResponse.data.repository_url);
    const repositoryUrl = repositoryTemplate.fill({
      owner: owner,
      repo: repo
    });
    const repositoryResponse = await serverGetSingleRepository(repositoryUrl, config);

    // issues
    const issuesTemplate = uriTemplates(repositoryResponse.data.issues_url);
    const issuesUrl = issuesTemplate.fill({});

    let issuesConfig = defaultConfig(settings.get("token"));
    /* eslint-disable camelcase */
    issuesConfig.params = {
      state: "all",
      page: 1,
      per_page: 100,
      sort: "updated"
    };
    /* eslint-enable camelcase */
    return await serverListIssuesForRepository(issuesUrl, issuesConfig);
  }

  async fetchAllIssues() {
    const settings = this.flux.getConfig();
    let config = defaultConfig(settings.get("token"));

    // endpoint
    const endpointResponse = await serverRootEndpoint(settings.get("apiendpoint"), config);

    // issues
    const issuesUrl = endpointResponse.data.issues_url;

    /* eslint-disable camelcase */
    let issuesConfig = defaultConfig(settings.get("token"));
    issuesConfig.params = {
      filter: "all",
      state: "all",
      page: 1,
      per_page: 100,
      sort: "updated"
    };
    /* eslint-enable camelcase */

    return await serverListIssues(issuesUrl, issuesConfig);
  }

  async fetchIssues() {
    const settings = this.flux.getConfig();
    if (!this.flux.loggedIn()) {
      const repositoryIssues = await this.fetchSlugRepositoryIssues(...settings.get("slug").split("/"));
      console.log(repositoryIssues);
      return repositoryIssues.data;
    }

    const userRepositoryIssues = await this.fetchAllIssues();
    console.log(userRepositoryIssues);
    return userRepositoryIssues.data;
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
