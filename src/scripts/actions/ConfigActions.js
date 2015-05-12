"use strict";

import { Actions } from "flummox";
import resetStorages from "myUtils/resetStorages";
import { initConfig, saveConfig } from "myUtils/persistence";
import Immutable from "immutable";

export default class ConfigActions extends Actions {

  constructor(flux) {
    super();
    this.flux = flux;
  }

  async saveSettings(settings) {
    try {
      const config = await saveConfig(settings);
      this.flux.setConfig(Immutable.fromJS(config));
      return config;
    } catch(e) {
      console.log(e);
      throw e;
    }
  }
  async clearAllData() {
    try {
      await resetStorages()();
      const config = await initConfig();
      this.flux.setConfig(Immutable.fromJS(config));
      return config;
    } catch(e) {
      console.log(e);
      throw e;
    }
  }
  adjustSettings(settings) {
    return settings;
  }
}
