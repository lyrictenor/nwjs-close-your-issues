'use strict';

import React from 'react/addons';
import FormInput from '../FormInput';
import Formsy from 'formsy-react';

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
    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <FormInput
          name="email"
          validations="isEmail"
          validationError="This is not a valid email"
          required />
        <button
          className="btn btn-default"
          type="submit"
          disabled={!this.state.canSubmit}>
          Submit
        </button>
      </Formsy.Form>
    );
  }
});

module.exports = ConfigForm;
