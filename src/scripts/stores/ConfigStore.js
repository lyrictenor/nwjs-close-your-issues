'use strict';

import { Store } from 'flummox';
import { Map } from 'immutable';

const defaultValues = {
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
    super();
    this.state = Map(defaultValues);
  }
  getDefaultApiendpoint() {
    return defaultValues.apiendpoint;
  }
  getDefaultToken() {
    return defaultValues.token;
  }
  getDefaultSlug() {
    return defaultValues.slug;
  }
  getDefaultUser() {
    return defaultValues.user;
  }
}
