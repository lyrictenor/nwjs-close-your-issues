'use strict';

import React from 'react/addons';

class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  render() {

    const handleAdd = () => {
      this.props.onAdd(this.state.value);
      this.setState({value: ''});
    };

    const handleChange = (e) => {
      this.setState({value: e.target.value});
    };

    return (
      <div>
        <h2>Add a issue</h2>
        <input type="text" value={this.state.value} onChange={handleChange.bind(this)} />
        &nbsp;
        <button className="btn btn-primary" onClick={handleAdd.bind(this)}>Add</button>
      </div>
    );
  }
}

export default IssueForm;
