"use strict";

import { Flux } from "flummox";
import Immutable from "immutable";
const immutableMap = Immutable.Map;

import IssueActions from "../actions/IssueActions";
import ConfigActions from "../actions/ConfigActions";
import IssueStore from "../stores/IssueStore";
import RepositoryStore from "../stores/RepositoryStore";
import UserStore from "../stores/UserStore";
import ConfigStore from "../stores/ConfigStore";
import PullRequestStore from "../stores/PullRequestStore";
import { initConfig } from "myUtils/persistence";
import decryptValue from "myUtils/decryptValue";

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
    this.createStore("repositories", RepositoryStore, this);
    this.createStore("users", UserStore, this);
    this.createStore("config", ConfigStore, this);
    this.createStore("pullRequests", PullRequestStore, this);
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
  getDecryptedToken() {
    return decryptValue(this.getConfig().get("token"), this.getPhrase());
  }
  getPhrase() {
    return "Thohh3quohgh0u";
  }

  loggedIn() {
    return Boolean(this.getConfig().get("token"));
  }
}
