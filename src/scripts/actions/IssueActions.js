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
import serverListPullRequests from "myUtils/githubListPullRequests";
import serverGetSingleRepository from "myUtils/githubGetSingleRepository";
import serverDeleteRefs from "myUtils/githubDeleteRefs";
import serverRootEndpoint from "myUtils/githubRootEndpoint";
import { saveUsersAndRepositories, saveIssues, getAllIssues, getAllRepositories, getAllUsers, savePullRequests, getAllPullRequests } from "myUtils/persistence";
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

  async serverListYourRepositoriesWithPage(url, page) {
    const token = this.flux.getDecryptedToken();
    /* eslint-disable camelcase */
    let repositoriesConfig = defaultConfig(token);
    repositoriesConfig.params = {
      page: page,
      per_page: 100
    };
    /* eslint-enable camelcase */
    return await serverListYourRepositories(url, repositoriesConfig);
  };

  async fetchServerRepositories(endpointData) {
    try {
      // repositories
      const repositoriesTemplate = uriTemplates(endpointData.current_user_repositories_url);
      const repositoriesUrl = repositoriesTemplate.fill({});
      const repositoriesResponse = await this.serverListYourRepositoriesWithPage(repositoriesUrl, 1);
      const parsedLink = parseLinkHeader(repositoriesResponse.headers.link);
      let lastPage;
      if (!parsedLink) {
        lastPage = 1;
      } else {
        lastPage = Number(parsedLink.last.page);
      }
      // FIXME: page count cap
      lastPage = (lastPage > 5) ? 5 : lastPage;

      // lastPage: 4; => [2, 3, 4]
      // lastPage: 1; => []
      const pageRange = range(2, lastPage + 1);
      const somethingPromiseForPage1 = new Promise((resolve) => {
        resolve(saveUsersAndRepositories(repositoriesResponse.data));
      });
      const promises = pageRange.map((page) => {
        return Promise
          .resolve({page: page, url: repositoriesUrl})
          .then((value) => {
            return this.serverListYourRepositoriesWithPage(value.url, value.page);
          })
          .then((response) => {
            return saveUsersAndRepositories(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      return await Promise.all([somethingPromiseForPage1, ...promises]);
    } catch(e) {
    console.log(e);
    throw e;
  }
}

  async serverListIssuesWithPage(url, page) {
    const token = this.flux.getDecryptedToken();
    /* eslint-disable camelcase */
    let issuesConfig = defaultConfig(token);
    issuesConfig.params = {
      filter: "all",
      state: "all",
      page: page,
      per_page: 100,
      sort: "updated"
    };
    /* eslint-enable camelcase */
    return await serverListIssues(url, issuesConfig);
  }

  async fetchAllIssues(endpointData) {
    try {
      // issues
      const issuesUrl = endpointData.issues_url;
      const issuesResponse = await this.serverListIssuesWithPage(issuesUrl, 1);
      const parsedLink = parseLinkHeader(issuesResponse.headers.link);
      let lastPage;
      if (!parsedLink) {
        lastPage = 1;
      } else {
        lastPage = Number(parsedLink.last.page);
      }
      // FIXME: page count cap
      lastPage = (lastPage > 5) ? 5 : lastPage;

      // lastPage: 4; => [2, 3, 4]
      // lastPage: 1; => []
      const pageRange = range(2, lastPage + 1);
      const somethingPromiseForPage1 = new Promise((resolve) => {
        resolve(saveIssues(issuesResponse.data));
      });
      const promises = pageRange.map((page) => {
        return Promise
          .resolve({page: page, url: issuesUrl})
          .then((value) => {
            return this.serverListIssuesWithPage(value.url, value.page);
          })
          .then((response) => {
            return saveIssues(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      const results = await Promise.all([somethingPromiseForPage1, ...promises]);
      return results;
    } catch(e) {
      console.log(e);
      throw e;
    }
  }
  async fetchRepositories() {
    try {
      const settings = this.flux.getConfig();
      const token = this.flux.getDecryptedToken();
      let config = defaultConfig(token);

      // endpoint
      const endpointResponse = await serverRootEndpoint(settings.get("apiendpoint"), config);

      if (!this.flux.loggedIn()) {
        // repository
        const repositoryTemplate = uriTemplates(endpointResponse.data.repository_url);
        const [owner, repo] = settings.get("slug").split("/");
        const repositoryUrl = repositoryTemplate.fill({
          owner: owner,
          repo: repo
        });
        const repositoryResponse = await serverGetSingleRepository(repositoryUrl, config);
        return [repositoryResponse.data];
      }

      await this.fetchServerRepositories(endpointResponse.data);
      const repositories = await getAllRepositories();
      return repositories;
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async serverListPullRequestsWithPage(url, page) {
    const token = this.flux.getDecryptedToken();
    /* eslint-disable camelcase */
    let pullsConfig = defaultConfig(token);
    pullsConfig.params = {
      state: "all",
      page: page,
      per_page: 100,
      sort: "updated"
    };
    /* eslint-enable camelcase */
    return await serverListPullRequests(url, pullsConfig);
  }

  async fetchRepositoryPullRequests(repository) {
    try {
      // pull requests
      const pullsTemplate = uriTemplates(repository.pulls_url);
      const pullsUrl = pullsTemplate.fill({
        number: null
      });
      const pullsResponse = await this.serverListPullRequestsWithPage(pullsUrl, 1);
      const parsedLink = parseLinkHeader(pullsResponse.headers.link);
      let lastPage;
      if (!parsedLink) {
        lastPage = 1;
      } else {
        lastPage = Number(parsedLink.last.page);
      }
      // FIXME: page count cap
      lastPage = (lastPage > 5) ? 5 : lastPage;

      // lastPage: 4; => [2, 3, 4]
      // lastPage: 1; => []
      const pageRange = range(2, lastPage + 1);
      const somethingPromiseForPage1 = new Promise((resolve) => {
        resolve(savePullRequests(pullsResponse.data));
      });
      const promises = pageRange.map((page) => {
        return Promise
          .resolve({page: page, url: pullsUrl})
          .then((value) => {
            return this.serverListPullRequestsWithPage(value.url, value.page);
          })
          .then((response) => {
            return savePullRequests(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      return await Promise.all([somethingPromiseForPage1, ...promises]);
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async fetchPullRequests() {
    const repositories = await this.fetchRepositories();
    await repositories.map((repository) => {
      this.fetchRepositoryPullRequests(repository);
    });
    return await getAllPullRequests();
  }

  async syncUsers(users = []) {
    if (!this.flux.loggedIn()) {
      return users;
    }
    const allUsers = await getAllUsers();
    return allUsers;
  }

  async fetchIssues() {
    try {
      const token = this.flux.getDecryptedToken();
      const settings = this.flux.getConfig();
      let config = defaultConfig(token);

      // endpoint
      const endpointResponse = await serverRootEndpoint(settings.get("apiendpoint"), config);

      if (!this.flux.loggedIn()) {
        const repositoryIssues = await this.fetchSlugRepositoryIssues(endpointResponse.data, ...settings.get("slug").split("/"));
        const users = repositoryIssues.data.reduce((previous, current) => {
          const ids = previous.map((user) => {
            return user.id;
          });
          if(current.user && ids.indexOf(current.user.id) === -1) {
            previous.push(current.user);
          }
          return previous;
        }, []);
        this.syncUsers(users);
        return repositoryIssues.data;
      }

      await this.fetchAllIssues(endpointResponse.data);
      const issues = await getAllIssues();
      this.syncUsers();
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
      const token = this.flux.getDecryptedToken();
      if (!this.flux.loggedIn()) {
        throw new AppError("toggle issue requires access token");
      }

      let config = defaultConfig(token);
      let data = {
        state: toggledIssueState(issue.get("state"))
      };
      let url = issue.get("url");
      const response = await serverEditIssue(url, data, config);
      if (!this.flux.loggedIn()) {
        return response.data;
      }
      const saved = await saveIssues([response.data]);
      return saved[0];
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async mergePullRequest(issue) {
    try {
      const token = this.flux.getDecryptedToken();
      if (!this.flux.loggedIn()) {
        throw new AppError("toggle issue requires access token");
      }
      if (!issue.pull_request.url) {
        throw new AppError("require pull request url");
      }
      if (!issue.url) {
        throw new AppError("require issue url");
      }

      let config = defaultConfig(token);
      let data = {};
      const issueUrl = issue.url;
      const pullRequestUrl = issue.pull_request.url;

      const mergeResponse = await serverMergePullRequest(pullRequestUrl, data, config);
      if (mergeResponse.data.merged !== true) {
        throw new AppError("merge does not complete");
      }

      const response = await serverGetSingleIssue(issueUrl, config);
      if (!this.flux.loggedIn()) {
        return response.data;
      }
      const saved = await saveIssues([response.data]);
      return saved[0];
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async deleteIssueBranch(issue) {
    try {
      const token = this.flux.getDecryptedToken();
      if (!this.flux.loggedIn()) {
        throw new AppError("toggle issue requires access token");
      }
      if (!issue.pull_request.url) {
        throw new AppError("require pull request url");
      }
      if (!issue.url) {
        throw new AppError("require issue url");
      }

      let config = defaultConfig(token);
      const pullRequestUrl = issue.pull_request.url;
      const issueUrl = issue.url;

      const response = await serverGetSinglePullRequest(pullRequestUrl, config);

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
      if (!this.flux.loggedIn()) {
        return response2.data;
      }
      const saved = await saveIssues([response2.data]);
      return saved[0];
    } catch(e) {
      console.log(e);
      throw e;
    }
  }
}
