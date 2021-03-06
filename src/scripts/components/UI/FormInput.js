"use strict";

import React from "react/addons";
import Formsy from "formsy-react";
import cx from "classnames";

// github.com/christianalfoni/formsy-react/issues/113
Formsy.addValidationRule("equalLengthOrEmpty", function (values, value, length) {
  return !value || (value && value.length > 0 && value.length === length);
});

let FormInput = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {
    this.setValue(event.currentTarget.value);
  },
  render () {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    let outerClassName = cx(
      this.props.className,
      "form-group",
      "has-feedback",
      { "has-success": this.isValid(), "has-error": !this.isValid() },
    );
    let labelClassName = "control-label";
    let inputClassName = cx(
      "form-control",
      { "required": this.showRequired() },
    );

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    let errorMessage = (this.getErrorMessage()) ? <span>{this.getErrorMessage()}</span> : null;
    let helpBlock = (this.props.helpBlock) ? <span className="help-block">{this.props.helpBlock}</span> : null;

    return (
      <div
        className={outerClassName}>
        <label
          className={labelClassName}
          htmlFor={this.props.name}>
            {this.props.name}
        </label>
        {errorMessage}
        <input
          type={this.props.type || "text"}
          name={this.props.name}
          className={inputClassName}
          onChange={this.changeValue}
          placeholder={this.props.placeholder}
          value={this.getValue()} />
        {helpBlock}
      </div>
    );
  }
});
module.exports = FormInput;
