"use strict";

import React from "react/addons";

export default class IssueHeader extends React.Component {
  onFetch() {
    this.props.flux.getActions("issues").fetchIssues();
  }
  onClear() {
    this.props.flux.getActions("issues").clearIssues();
  }
  render() {
    return (
      <div className="issue-header">
        <button
          className="btn btn-default"
          type="submit"
          onClick={this.onFetch.bind(this)} >
          Fetch Issues
        </button>

        <button
          className="btn btn-default"
          type="submit"
          onClick={this.onClear.bind(this)} >
          Clear Issues
        </button>
      </div>
    );
  }
}
