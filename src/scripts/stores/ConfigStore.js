'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';

const defaultValues = require('../../config_settings.json');

let getPersistedData = async () => {
  let db = await window.closeyourissues.db.connect();
  let configTables = await db.getSchema().table('Configs');
  let results = await db.select().from(configTables).exec();
  return results;
};

export class ConfigStore extends Store {
  async constructor(flux) {
    super();

    //let result = getPersistedData();
    //console.log(result);
    //const savedConfig = result.reduce((previous, current) => {
    //  previous[current.key] = current.value;
    //  return previous;
    //}, {});
    //const initialValues = (savedConfig.slug && savedConfig.apiendpoint && savedConfig.webendpoint)
    //  ? savedConfig
    //  : defaultValues;
    //this.state = { settings: Immutable.fromJS(this.setUpDefault(initialValues))};
    this.state = { settings: Immutable.fromJS(this.setUpDefault(defaultValues))};

    /*
     Registering action handlers
     */

    const configActionIds = flux.getActionIds('config');

    this.register(configActionIds.saveSettings, this.saveSettings);
    this.register(configActionIds.clearAllData, this.clearAllData);

  }

  clearAllData() {
    this.setState({ settings: Immutable.fromJS(this.setUpDefault(defaultValues)) });

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
  }

  async persistParams(params) {
    let db = await window.closeyourissues.db.connect();
    let configTables = await db.getSchema().table('Configs');
    await db.delete().from(configTables).exec();

    let rows = Object.keys(params).reduce(function(previous, current) {
      previous.push(
        configTables.createRow({
          key: current,
          value: params[current]
        })
      );
      return previous;
    }, []);
    let result = await db.insertOrReplace().into(configTables).values(rows).exec();
    console.log(result);
  }

  async saveSettings(settings) {
    let params = this.convertSettings(settings);
    this.setState({ settings: Immutable.fromJS(this.setUpDefault(params)) });
    await this.persistParams(params);
  }

  convertSettings(settings) {
    return {
      apiendpoint: this.remoteTrailingSlash(settings.apiEndpoint),
      webendpoint: this.remoteTrailingSlash(settings.webEndpoint),
      token: settings.accessToken,
      slug: this.remoteTrailingSlash(settings.slug)
    };
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
