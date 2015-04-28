'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';

export const defaultValues = {
  apiendpoint: 'https://api.github.com',
  token: '',
  slug: 'rails/rails',
  user: {
    firstname: 'Dear',
    lastname: 'User'
  }
};

export class ConfigStore extends Store {
  constructor(flux) {
    super(flux);
    this.state = { settings: Immutable.fromJS(defaultValues)};
  }
  getSettings() {
    return this.state.settings.toJS();
  }
}
