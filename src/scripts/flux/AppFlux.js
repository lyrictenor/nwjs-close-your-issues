"use strict";

import { Flux } from "flummox";

import { IssueActions } from "../actions/IssueActions";
import { ConfigActions } from "../actions/ConfigActions";
import { IssueStore } from "../stores/IssueStore";
import { ConfigStore } from "../stores/ConfigStore";

export class AppFlux extends Flux {

  constructor() {
    super();

    // The extra argument(s) are passed to the Action / Store constructors
    this.createActions("issues", IssueActions, this);
    this.createActions("config", ConfigActions, this);

    this.createStore("issues", IssueStore, this);
    this.createStore("config", ConfigStore, this);
  }
}
