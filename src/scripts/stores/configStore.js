'use strict';

import { Store } from 'flummox';
import { Map } from 'immutable';

export class ConfigStore extends Store {
  const defaultValues = {
    apiendpoint: 'https://api.github.com',
    token: '',
    slug: 'rails/rails',
  };
  constructor(flux) {
    super();

    this.state = Map(this.defaultValues);
  }
  getDefaultApiendpoint() {
    return this.defaultValues.apiendpoint;
  }
  getDefaultToken() {
    return this.defaultValues.token;
  }
  getDefaultSlug() {
    return this.defaultValues.slug;
  }
}
