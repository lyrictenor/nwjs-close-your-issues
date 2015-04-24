'use strict';

import { Flux } from 'flummox';
import Immutable from 'immutable';

import { IssueActions } from '../actions/IssueActions';
import { IssueStore } from '../stores/IssueStore';

export class AppFlux extends Flux {

  constructor(config) {
    super();

    this.config = Immutable.fromJS(config);

    // The extra argument(s) are passed to the Action / Store constructors
    this.createActions('issues', IssueActions, this);
    this.createStore('issues', IssueStore, this);
  }

  getApiendpoint() {
    return this.config.get('apiendpoint');
  }

  getUser() {
    return this.config.get('user').toJS();
  }
}
