'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';

const defaultValues = require('../../config_settings.json');

export class ConfigStore extends Store {
  constructor(flux) {
    super();
    this.state = { settings: Immutable.fromJS(this.setUpDefault(defaultValues))};

    /*
     Registering action handlers
     */

    const configActionIds = flux.getActionIds('config');

    this.register(configActionIds.saveSettings, (settings) => {
      const params = {
        apiendpoint: this.remoteTrailingSlash(settings.apiEndpoint),
        webendpoint: this.remoteTrailingSlash(settings.webEndpoint),
        token: settings.accessToken,
        slug: this.remoteTrailingSlash(settings.slug)
      };
      this.setState({ settings: Immutable.fromJS(this.setUpDefault(params)) });
    });

    this.register(configActionIds.clearAllData, () => {
      // http://stackoverflow.com/questions/15861630/how-can-i-remove-a-whole-indexeddb-database-from-javascript
      let req = indexedDB.deleteDatabase('close_your_issues');
      req.onsuccess = function () {
        console.log("Deleted database successfully");
      };
      req.onerror = function () {
        console.log("Couldn't delete database");
      };
      req.onblocked = function () {
        console.log("Couldn't delete database due to the operation being blocked");
      };

      this.setState({ settings: Immutable.fromJS(this.setUpDefault(defaultValues)) });
    });

  }
  getSettings() {
    return this.state.settings.toJS();
  }
  remoteTrailingSlash(string) {
    if(typeof string !== 'string') {
      return string;
    }
    return string.replace(/\/+$/, '');
  }
  setUpDefault(json) {
    json.tokenurl = `${json.webendpoint}/settings/tokens/new`;
    return json;
  }
}
