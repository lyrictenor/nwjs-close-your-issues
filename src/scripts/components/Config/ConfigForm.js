'use strict';

import React from 'react/addons';
import FormInput from '../UI/FormInput';
import Formsy from 'formsy-react';
import cx from 'classnames';
const defaultValues = require('../../../config_settings.json');

class ConfigForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canSubmit: false };
  }
  enableButton() {
    this.setState({
      canSubmit: true
    });
  }
  disableButton() {
    this.setState({
      canSubmit: false
    });
  }
  submit(model) {
    this.props.flux.getActions('config').saveSettings(model);
  }
  render() {
    let submitText = (this.state.canSubmit) ? 'Save' : 'Invalid';
    let buttonClass = cx(
      'btn',
      'btn-default',
      'btn-block',
      {'btn-success': this.state.canSubmit},
    );
    let settings = this.props.settings.toJS();

    return (
      <Formsy.Form
        onValidSubmit={this.submit.bind(this)}
        onValid={this.enableButton.bind(this)}
        onInvalid={this.disableButton.bind(this)}>
        <FormInput
          name="apiEndpoint"
          placeholder={defaultValues.apiendpoint}
          validationError="Api Endpoint is required"
          value={settings.apiendpoint}
          required />
        <FormInput
          name="accessToken"
          type="password"
          validations="equalLengthOrEmpty:40"
          value={settings.token}
          helpBlock="Blank OR Just 40 characters" />
        <FormInput
          name="slug"
          placeholder={defaultValues.slug}
          validationError="Slug is required"
          value={settings.slug}
          required />
        <button
          className={buttonClass}
          type="submit"
          disabled={!this.state.canSubmit}>
          {submitText}
        </button>
      </Formsy.Form>
    );
  }
}

export default ConfigForm;
