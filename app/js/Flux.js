'use strict';
import { Flummox } from 'flummox';
import IssueActions from './actions/IssueActions';
import IssueStore from './stores/IssueStore';

export default class Flux extends Flummox {
  constructor() {
    super();

    this.createActions('issues', IssueActions);
    this.createStore('issues', IssueStore, this);
  }
}
