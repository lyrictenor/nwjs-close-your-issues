import React from 'react';

class Issue extends React.Component {
  render() {
    const { issue } = this.props;

    if (!issue) return null;

    return (
      <div>
        {issue}
      </div>
    );
  }
}

export default Issue;
