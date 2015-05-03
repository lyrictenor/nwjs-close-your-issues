"use strict";

import { Actions } from "flummox";

export class ConfigActions extends Actions {

  constructor(flux) {
    super();
    this.flux = flux;
  }

  saveSettings(settings) {
    return settings;
  }
  clearAllData() {
    return true;
  }
}
