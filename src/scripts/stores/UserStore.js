"use strict";

import { Store } from "flummox";
import { Map as map, Record as record, OrderedMap as orderedMap } from "immutable";

/* eslint-disable camelcase */
const userRecord = record({
  id: null,
  login: "",
  created_at: null,
  updated_at: null
});
/* eslint-enable camelcase */

export default class UserStore extends Store {

  constructor(flux) {
    super();

    this.flux = flux;
    this.state = { users: orderedMap() };

    /*
     Registering action handlers
     */
    const issueActionIds = flux.getActionIds("issues");

    this.register(issueActionIds.syncUsers, this.updateMultipleData);
  }
  updateMultipleData(data) {
    let dataMap = orderedMap();
    for(let datum of data) {
      dataMap = dataMap.set(datum.id, userRecord(datum));
    }

    this.setState({ users: this.state.users.merge(dataMap) });
  }
  clearData() {
    this.setState({ users: this.state.users.clear() });
  }
  deleteDatum(datum) {
    let data = this.state.users.delete(datum.get("id"));
    if(data !== this.state.users) {
      this.setState({ users: data });
    }
  }
  updateSingleDatum(datum) {
    this.updateMultipleData([datum]);
  }
  updateSingleDatumWithoutSort(datum) {
    let dataMap = orderedMap();
    dataMap = dataMap.set(datum.id, userRecord(datum));
    this.setState({ users: this.state.users.merge(dataMap) });
  }

  getData() {
    return this.state.users;
  }
}
