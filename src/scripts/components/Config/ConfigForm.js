'use strict';

import React from 'react/addons';
import FormInput from '../UI/FormInput';
import Formsy from 'formsy-react';
import cx from 'classnames';

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
    console.log(model);
    //someDep.saveEmail(model.email);
  }
  render() {
    let submitText = (this.state.canSubmit) ? 'Save' : 'Invalid';
    let buttonClass = cx(
      'btn',
      'btn-default',
      'btn-block',
      {'btn-success': this.state.canSubmit},
    );

    return (
      <Formsy.Form
        onValidSubmit={this.submit.bind(this)}
        onValid={this.enableButton.bind(this)}
        onInvalid={this.disableButton.bind(this)}>
        <FormInput
          name="apiEndpoint"
          placeholder="placeholder"
          validationError="Api Endpoint is required"
          required />
        <FormInput
          name="accessToken"
          type="password"
          validations="equalLengthOrEmpty:40"
          helpBlock="Blank OR Just 40 characters" />
        <FormInput
          name="slug"
          placeholder="placeholder"
          validationError="Slug is required"
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
