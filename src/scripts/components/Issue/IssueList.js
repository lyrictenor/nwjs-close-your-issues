"use strict";

import React from "react/addons";
import IssueCard from "components/Issue/IssueCard";

export default class IssueList extends React.Component {
  render() {
    const { issues, ...props } = this.props;
    const issueCards = issues.map(issue =>
      <IssueCard
        {...props}
        issue={issue}
        />
    );

    return (
      <div>
        {issueCards.size > 0 ?
          <ul className="issue-list alternatives list-unstyled">{issueCards}</ul>
          :
          <h4>Nothing in the list ! Try adding some elements using the form below.</h4>
        }
      </div>
    );
  }
}
