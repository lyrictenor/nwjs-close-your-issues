'use strict';
import React from 'react';
import IssueList from './IssueList.jsx';

class IssueHandler extends React.Component {
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
