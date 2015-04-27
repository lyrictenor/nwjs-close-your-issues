'use strict';

import React from 'react/addons';
import FormInput from '../UI/FormInput';
import Formsy from 'formsy-react';
import Classnames from 'classnames';

let ConfigForm = React.createClass({
  getInitialState() {
    return { canSubmit: false };
  },
  enableButton() {
    this.setState({
      canSubmit: true
    });
  },
  disableButton() {
    this.setState({
      canSubmit: false
    });
  },
  submit(model) {
    console.log(model);
    //someDep.saveEmail(model.email);
  },
  render() {
    let submitText = (this.state.canSubmit) ? 'Save' : 'Invalid';
    let buttonClass = Classnames(
      'btn',
      'btn-default',
      'btn-block',
      {'btn-success': this.state.canSubmit},
    );

    return (
      <Formsy.Form
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}>
        <FormInput
          name="apiEndpoint"
          placeholder="placeholder"
          validationError="Api Endpoint is required"
          required />
        <FormInput
          name="accessToken"
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
});

module.exports = ConfigForm;
