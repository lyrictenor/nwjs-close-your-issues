'use strict';
import React from 'react';
import IssueList from './IssueList.jsx';

class IssueHandler extends React.Component {
  componentWillMount() {
    this.props.flux.getStore('issues').addListener('change', this.onIssueStoreChange);
  }

  componentWillUnmount() {
    this.props.flux.getStore('issues').removeListener('change', this.onIssueStoreChange);
  }

  onIssueStoreChange() {
    this.setState({ issues: this.props.flux.getStore('issues').getIssues() });
  }

  render() {
    return (
      <div>
      {!this.props.issues && (<p>There is no issues</p>)}
      {this.props.issues && this.props.issues.map((issue) =>
        <span>{issue.id} {issue.title}</span>
      ).toJS()}
      </div>
    );
  }
}

export default IssueHandler;
