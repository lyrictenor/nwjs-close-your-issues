"use strict";

import { Store } from "flummox";
import { Map as map, Record as record, OrderedMap as orderedMap } from "immutable";

/* eslint-disable camelcase */
const repositoryRecord = record({
  id: null,
  name: "",
  full_name: ""
  //owner: record({
  //  id: null,
  //  login: null,
  //  avatar_url: null
  //}),
  //private: false,
  //html_url: "",
  //description: "",
  //fork: false,
  //url: "",
  //forkes_url: "",
  //keys_url: "",
  //collaborators_url: "",
  //teams_url: "",
  //hooks_url: "",
  //issue_events_url: "",
  //events_url: "",
  //assignees_url: "",
  //branches_url: "",
  //tags_url: "",
  //blobs_url: "",
  //git_tags_url: "",
  //git_refs_url: "",
  //trees_url: "",
  //statuses_url: "",
  //languages_url: "",
  //stargazers_url: "",
  //contributors_url: "",
  //subscribers_url: "",
  //subscription_url: "",
  //commits_url: "",
  //git_commits_url: "",
  //comments_url: "",
  //issue_comment_url: "",
  //contents_url: "",
  //compare_url: "",
  //merges_url: "",
  //archive_url: "",
  //downloads_url: "",
  //issues_url: "",
  //pulls_url: "",
  //milestones_url: "",
  //notifications_url: "",
  //labels_url: "",
  //releases_url: "",
  //created_at: null,
  //updated_at: null,
  //pushed_at: null,
  //git_url: "",
  //ssh_url: "",
  //clone_url: "",
  //svn_url: "",
  //homepage: "",
  //size: 0,
  //stargazers_count: 0,
  //watchers_count: 0,
  //language: "",
  //has_issues: false,
  //has_downloads: false,
  //has_wiki: false,
  //has_pages: false,
  //forks_count: 0,
  //mirror_url: "",
  //open_issues_count: 0,
  //forks: 0,
  //open_issues: 0,
  //watchers: 0,
  //default_branch: "",
  //permissions: null,
  //organization: null,
  //network_cont: 0,
  //subscribers_cont: 0
});
/* eslint-enable camelcase */

export default class RepositoryStore extends Store {

  constructor(flux) {
    super();

    this.flux = flux;
    this.state = { repositories: orderedMap() };

    /*
     Registering action handlers
     */
    const issueActionIds = flux.getActionIds("issues");

    this.register(issueActionIds.fetchRepositories, this.updateMultipleData);
  }
  updateMultipleData(data) {
    let dataMap = orderedMap();
    for(let datum of data) {
      dataMap = dataMap.set(datum.id, repositoryRecord(datum));
    }

    this.setState({ repositories: this.state.repositories.merge(dataMap) });
  }
  clearData() {
    this.setState({ repositories: this.state.repositories.clear() });
  }
  deleteDatum(datum) {
    let data = this.state.repositories.delete(datum.get("id"));
    if(data !== this.state.repositories) {
      this.setState({ repositories: data });
    }
  }
  updateSingleDatum(datum) {
    this.updateMultipleData([datum]);
  }
  updateSingleDatumWithoutSort(datum) {
    let dataMap = orderedMap();
    dataMap = dataMap.set(datum.id, repositoryRecord(datum));
    this.setState({ repositories: this.state.repositories.merge(dataMap) });
  }

  getData() {
    return this.state.repositories;
  }
}
