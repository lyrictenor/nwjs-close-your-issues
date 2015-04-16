import React from 'react';

import IssueCard from './IssueCard.jsx';


export default class IssueList extends React.Component {
  render() {
    const issues = this.props.issues.map(issue => {
      return (
      {issue}
      );
    });
    return (
      <div>
        {issues}
      </div>
    );
  }
}
