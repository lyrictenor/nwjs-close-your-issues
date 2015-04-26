'use strict';

import Formsy from 'formsy-react';
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
    let className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    let errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <input
          /* https://github.com/christianalfoni/formsy-react/issues/109 */
          type={this.props.type ? this.props.type : 'text'}
          onChange={this.changeValue}
          value={this.getValue()} />
        <span>{errorMessage}</span>
      </div>
    );
  }
});
module.exports = FormInput;
