import React from 'react';

import IssueCard from './IssueCard.jsx';


export default class IssueList extends React.Component {
  render() {
    const issues = this.props.issues.map(issue => {
      return (
        <IssueCard issue={issue} />
      );
    });
    return (
      <div>
        {issues}
      </div>
    );
  }
}
