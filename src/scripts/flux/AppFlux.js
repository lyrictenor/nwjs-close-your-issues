"use strict";

import { Flux } from "flummox";
import Immutable from "immutable";
const immutableMap = Immutable.Map;

import IssueActions from "../actions/IssueActions";
import ConfigActions from "../actions/ConfigActions";
import IssueStore from "../stores/IssueStore";
import ConfigStore from "../stores/ConfigStore";
import { initConfig } from "myUtils/persistence";

export default class AppFlux extends Flux {
  constructor() {
    super();

    this._config = immutableMap();
    this._user = immutableMap();

    initConfig().then((config) => {
      this.setConfig(Immutable.fromJS(config));
      this.getActions("config").adjustSettings(config);
    });

    // The extra argument(s) are passed to the Action / Store constructors
    this.createActions("issues", IssueActions, this);
    this.createActions("config", ConfigActions, this);

    this.createStore("issues", IssueStore, this);
    this.createStore("config", ConfigStore, this);
  }

  getConfig() {
    return this._config;
  }
  setConfig(config) {
    this._config = config;
  }
  getUser() {
    return this._user;
  }
  setUser(user) {
    this._user = user;
  }
  loggedIn() {
    return Boolean(this.getConfig().get("token"));
  }
}
