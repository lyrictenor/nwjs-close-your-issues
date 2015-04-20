import React from 'react';

class IssueCard extends React.Component {
  render() {
    const { issue } = this.props;

    if (!issue) return null;

    return (
      <div>
        {issue.title}, {issue.id}
      </div>
    );
  }
}

export default IssueCard;
