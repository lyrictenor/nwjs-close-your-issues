'use strict';
import { Flummox } from 'flummox';
import IssueActions from './actions/IssueActions';
//import DocStore from './stores/DocStore';

export default class Flux extends Flummox {
  constructor() {
    super();

    const issueActions = this.createActions('issues', IssueActions);
    //this.createStore('docs', DocStore, { docActions });
  }
}
