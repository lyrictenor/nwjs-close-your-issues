'use strict';

import React from 'react/addons';
import FormInput from 'components/UI/FormInput';
import Formsy from 'formsy-react';
import onOpenExternals from 'myUtils/openExternals';
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
    const submitText = (this.state.canSubmit) ? 'Save' : 'Invalid';
    const buttonClass = cx(
      'btn',
      'btn-default',
      'btn-block',
      {'btn-success': this.state.canSubmit},
    );
    const settings = this.props.settings.toJS();

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
          name="webEndpoint"
          placeholder={defaultValues.webendpoint}
          validationError="Web Endpoint is required"
          value={settings.webendpoint}
          required />
        <FormInput
          name="accessToken"
          type="password"
          validations="equalLengthOrEmpty:40"
          value={settings.token}
          helpBlock="Blank OR Just 40 characters" />
        <a href={settings.tokenurl} onClick={onOpenExternals.bind(this)} >
          Get AccessToken
        </a>.
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
