"use strict";

import { Actions } from "flummox";
import axios from "axios";
import uriTemplates from "uri-templates";
import parseLinkHeader from "parse-link-header";
import range from "lodash/utility/range";
import defaultConfig from "myUtils/githubDefaultConfig";
import serverListIssues from "myUtils/githubListIssues";
import serverListIssuesForRepository from "myUtils/githubListIssuesForRepository";
import serverListYourRepositories from "myUtils/githubListYourRepositories";
import serverEditIssue from "myUtils/githubEditIssue";
import serverGetSingleIssue from "myUtils/githubGetSingleIssue";
import serverMergePullRequest from "myUtils/githubMergePullRequest";
import serverGetSinglePullRequest from "myUtils/githubGetSinglePullRequest";
import serverGetSingleRepository from "myUtils/githubGetSingleRepository";
import serverDeleteRefs from "myUtils/githubDeleteRefs";
import serverRootEndpoint from "myUtils/githubRootEndpoint";
import { saveUsersAndRepositories, saveIssues, getIssues } from "myUtils/persistence";
import AppError from "myUtils/AppError";

const toggledIssueState = (state) => {
  return (state === "open") ? "closed" : "open";
};

export default class IssueActions extends Actions {

  constructor(flux) {
    super();
    this.flux = flux;
  }

  async fetchSlugRepositoryIssues(endpointData, owner, repo) {
    try {
      let config = defaultConfig(false);

      // repository
      const repositoryTemplate = uriTemplates(endpointData.repository_url);
      const repositoryUrl = repositoryTemplate.fill({
        owner: owner,
        repo: repo
      });
      const repositoryResponse = await serverGetSingleRepository(repositoryUrl, config);

      // issues
      const issuesTemplate = uriTemplates(repositoryResponse.data.issues_url);
      const issuesUrl = issuesTemplate.fill({});

      let issuesConfig = defaultConfig(false);
      /* eslint-disable camelcase */
      issuesConfig.params = {
        state: "all",
        page: 1,
        per_page: 100,
        sort: "updated"
      };
      /* eslint-enable camelcase */
      return await serverListIssuesForRepository(issuesUrl, issuesConfig);
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async fetchRepositories(endpointData) {
    try {
      const settings = this.flux.getConfig();
      // repositories
      const repositoriesTemplate = uriTemplates(endpointData.current_user_repositories_url);
      const repositoriesUrl = repositoriesTemplate.fill({});
      /* eslint-disable camelcase */
      let repositoriesConfig = defaultConfig(settings.get("token"));
      repositoriesConfig.params = {
        page: 1,
        per_page: 100
      };
      /* eslint-enable camelcase */
      const repositoriesResponse = await serverListYourRepositories(repositoriesUrl, repositoriesConfig);
      const parsedLink = parseLinkHeader(repositoriesResponse.headers.link);
      console.log(repositoriesResponse);
      console.log(parsedLink);
      let lastPage = Number(parsedLink.last.page);
      // FIXME: page count cap
      lastPage = (lastPage > 5) ? 5 : lastPage;

      // lastPage: 4; => [2, 3, 4]
      // lastPage: 1; => []
      const pageRange = range(2, lastPage + 1);
      const somethingPromiseForPage1 = new Promise((resolve) => {
        resolve(saveUsersAndRepositories(repositoriesResponse.data));
      });
      const serverListYourRepositoriesWithPage = (url, page) => {
        const settings = this.flux.getConfig();
        /* eslint-disable camelcase */
        let repositoriesConfig = defaultConfig(settings.get("token"));
        repositoriesConfig.params = {
          page: page,
          per_page: 100
        };
        /* eslint-enable camelcase */
        return serverListYourRepositories(url, repositoriesConfig);
      };
      const promises = pageRange.map((page) => {
        return Promise
          .resolve({page: page, url: repositoriesUrl})
          .then((value) => {
            return serverListYourRepositoriesWithPage(value.url, value.page);
          })
          .then((response) => {
            console.log(response);
            return saveUsersAndRepositories(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      const results = await Promise.all([somethingPromiseForPage1, ...promises]);
      console.log(results);
      return results;
    } catch(e) {
    console.log(e);
    throw e;
  }
}

  async fetchAllIssues(endpointData) {
    try {
      const settings = this.flux.getConfig();
      // issues
      const issuesUrl = endpointData.issues_url;

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

      const issuesResponse = await serverListIssues(issuesUrl, issuesConfig);
      const parsedLink2 = parseLinkHeader(issuesResponse.headers.link);
      console.log(issuesResponse);
      console.log(parsedLink2);
      let lastPage2 = Number(parsedLink2.last.page);
      // FIXME: page count cap
      lastPage2 = (lastPage2 > 5) ? 5 : lastPage2;

      // lastPage: 4; => [2, 3, 4]
      // lastPage: 1; => []
      const pageRange2 = range(2, lastPage2 + 1);
      const somethingPromiseForPage12 = new Promise((resolve) => {
        resolve(saveIssues(issuesResponse.data));
      });
      const serverListIssuesWithPage = (url, page) => {
        const settings = this.flux.getConfig();
        /* eslint-disable camelcase */
        let issuesConfig = defaultConfig(settings.get("token"));
        issuesConfig.params = {
          filter: "all",
          state: "all",
          page: page,
          per_page: 100,
          sort: "updated"
        };
        /* eslint-enable camelcase */
        return serverListIssues(url, issuesConfig);
      };
      const promises2 = pageRange2.map((page) => {
        return Promise
          .resolve({page: page, url: issuesUrl})
          .then((value) => {
            return serverListIssuesWithPage(value.url, value.page);
          })
          .then((response) => {
            console.log(response);
            return saveIssues(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      const results2 = await Promise.all([somethingPromiseForPage12, ...promises2]);

      // repositories
      this.fetchRepositories(endpointData);
      return results2;
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async fetchIssues() {
    try {
      const settings = this.flux.getConfig();
      let config = defaultConfig(settings.get("token"));

      // endpoint
      const endpointResponse = await serverRootEndpoint(settings.get("apiendpoint"), config);

      if (!this.flux.loggedIn()) {
        const repositoryIssues = await this.fetchSlugRepositoryIssues(endpointResponse.data, ...settings.get("slug").split("/"));
        console.log(repositoryIssues);
        return repositoryIssues.data;
      }

      await this.fetchAllIssues(endpointResponse.data);
      const issues = await getIssues();
      console.log(issues);
      return issues;
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  clearIssues() {
    //const settings = this.fetchSettings();
    return true;
  }

  deleteIssue(issue) {
    return issue;
  }

  async toggleIssueState(issue) {
    try {
      const settings = this.flux.getConfig();
      if (!this.flux.loggedIn()) {
        throw new AppError("toggle issue requires access token");
      }

      let config = defaultConfig(settings.get("token"));
      let data = {
        state: toggledIssueState(issue.get("state"))
      };
      let url = issue.get("url");
      const response = await serverEditIssue(url, data, config);
      console.log(response);
      if (!this.flux.loggedIn()) {
        return response.data;
      }
      const saved = await saveIssues([response.data]);
      console.log(saved);
      return saved[0];
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async mergePullRequest(issue) {
    try {
      const settings = this.flux.getConfig();
      if (!this.flux.loggedIn()) {
        throw new AppError("toggle issue requires access token");
      }
      if (!issue.pull_request.url) {
        throw new AppError("require pull request url");
      }
      if (!issue.url) {
        throw new AppError("require issue url");
      }

      let config = defaultConfig(settings.get("token"));
      let data = {};
      const issueUrl = issue.url;
      const pullRequestUrl = issue.pull_request.url;

      const mergeResponse = await serverMergePullRequest(pullRequestUrl, data, config);
      console.log(mergeResponse);
      if (mergeResponse.data.merged !== true) {
        console.log(mergeResponse.data.message);
        throw new AppError("merge does not complete");
      }

      const response = await serverGetSingleIssue(issueUrl, config);
      console.log(response);
      if (!this.flux.loggedIn()) {
        return response.data;
      }
      saveIssues([response.data]);
      return response.data;
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async deleteIssueBranch(issue) {
    try {
      const settings = this.flux.getConfig();
      if (!this.flux.loggedIn()) {
        throw new AppError("toggle issue requires access token");
      }
      if (!issue.pull_request.url) {
        throw new AppError("require pull request url");
      }
      if (!issue.url) {
        throw new AppError("require issue url");
      }

      let config = defaultConfig(settings.get("token"));
      const pullRequestUrl = issue.pull_request.url;
      const issueUrl = issue.url;

      const response = await serverGetSinglePullRequest(pullRequestUrl, config);
      console.log(response);

      const pullRequest = response.data;
      const headRef = pullRequest.head.ref;
      const refTemplate = pullRequest.head.repo.git_refs_url;
      if (!headRef) {
        throw new AppError("branch ref does not exist");
      }
      if (!refTemplate) {
        throw new AppError("git ref template does not exist");
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
      if (!this.flux.loggedIn()) {
        return response2.data;
      }
      saveIssues([response.data]);
      return response2.data;
    } catch(e) {
      console.log(e);
      throw e;
    }
  }
}
