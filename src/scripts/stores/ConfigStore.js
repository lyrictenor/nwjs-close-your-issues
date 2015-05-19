"use strict";

import { Store } from "flummox";
import Immutable from "immutable";
const immutableMap = Immutable.Map;
import { defaultValues } from "myUtils/persistence";

const configDecorator = (jsObject) => {
  let copied = Object.assign({}, jsObject);
  copied.tokenurl = `${copied.webendpoint}/settings/tokens/new`;
  return copied;
};

export default class ConfigStore extends Store {
  constructor(flux) {
    super();

    this.state = { settings: immutableMap() };
    this.flux = flux;

    /*
     Registering action handlers
     */

    const configActionIds = flux.getActionIds("config");

    this.register(configActionIds.saveSettings, this.saveSettings);
    this.register(configActionIds.clearAllData, this.saveSettings);
    this.register(configActionIds.adjustSettings, this.saveSettings);
  }

  saveSettings(settings) {
    this.setState({ settings: Immutable.fromJS(configDecorator(settings)) });
  }

  getSettings() {
    return this.state.settings;
  }

  getDefaultValues() {
    return defaultValues;
  }
  getDecryptedToken() {
    const token = this.getSettings().get("token");
    if (!token) {
      return token;
    }
    return this.flux.decryptToken(token, this.flux.getPhrase());
  }
}
