"use strict";

import React from "react/addons";

export default class PullRequestList extends React.Component {
  render() {
    const { pullRequests, ...props } = this.props;
    const pullRequestCards = pullRequests.map(pull =>
      <div>{pull.id}: {pull.html_url}</div>
    );

    return (
      <div>
        {pullRequestCards.size > 0 ?
          <ul className="pull-request-list alternatives list-unstyled">{pullRequestCards}</ul>
          :
          <h4>Nothing in the list ! Try adding some elements using the form below.</h4>
        }
      </div>
    );
  }
}
