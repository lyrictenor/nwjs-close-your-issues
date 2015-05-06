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
    const config = await saveConfig(settings);
    this.flux.setConfig(Immutable.fromJS(config));
    return config;
  }
  async clearAllData() {
    await resetStorages()();
    const config = await initConfig();
    this.flux.setConfig(Immutable.fromJS(config));
    return config;
  }
  adjustSettings(settings) {
    return settings;
  }
}
