"use strict";

import { Store } from "flummox";
import { Map as map, Record as record, OrderedMap as orderedMap } from "immutable";

/* eslint-disable camelcase */
const pullRequestRecord = record({
  id: null,
  url: "",
  html_url: "",
  statuses_url: ""
});
/* eslint-enable camelcase */

export default class PullRequestStore extends Store {

  constructor(flux) {
    super();

    this.flux = flux;
    this.state = { pullRequests: orderedMap() };

    /*
     Registering action handlers
     */
    const issueActionIds = flux.getActionIds("issues");

    this.register(issueActionIds.fetchPullRequests, this.updateMultipleData);
  }
  updateMultipleData(data) {
    let dataMap = orderedMap();
    for(let datum of data) {
      dataMap = dataMap.set(datum.id, pullRequestRecord(datum));
    }

    this.setState({ pullRequests: this.state.repositories.merge(dataMap) });
  }
  clearData() {
    this.setState({ pullRequests: this.state.pullRequests.clear() });
  }
  deleteDatum(datum) {
    let data = this.state.pullRequests.delete(datum.get("id"));
    if(data !== this.state.pullRequests) {
      this.setState({ pullRequests: data });
    }
  }
  updateSingleDatum(datum) {
    this.updateMultipleData([datum]);
  }
  updateSingleDatumWithoutSort(datum) {
    let dataMap = orderedMap();
    dataMap = dataMap.set(datum.id, pullRequestRecord(datum));
    this.setState({ pullRequests: this.state.pullRequests.merge(dataMap) });
  }

  getData() {
    return this.state.pullRequests;
  }
}
