'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';

const defaultValues = require('../../config_settings.json');

export class ConfigStore extends Store {
  constructor(flux) {
    super();
    this.state = { settings: Immutable.fromJS(defaultValues)};
  }
  getSettings() {
    return this.state.settings.toJS();
  }
}
