'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';

const defaultValues = require('../../config_settings.json');

export class ConfigStore extends Store {
  constructor(flux) {
    super();
    this.state = { settings: Immutable.fromJS(defaultValues)};

    /*
     Registering action handlers
     */

    const configActionIds = flux.getActionIds('config');

    this.register(configActionIds.saveSettings, (settings) => {
      const params = {
        apiendpoint: settings.apiEndpoint,
        webendpoint: settings.webEndpoint,
        token: settings.accessToken,
        slug: settings.slug
      };
      this.setState({ settings: Immutable.fromJS(params) });
    });

  }
  getSettings() {
    return this.state.settings.toJS();
  }
}
