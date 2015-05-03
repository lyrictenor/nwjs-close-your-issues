"use strict";

import React from "react/addons";
import IssueCard from "components/Issue/IssueCard";

export default class IssueList extends React.Component {
  render() {
    const issues = this.props.issues.map(issue =>
      <IssueCard {...this.props} issue={issue} />
    );

    return (
      <div>
        {issues.size > 0 ?
          <ul className="issue-list alternatives list-unstyled">{issues}</ul>
          :
          <h4>Nothing in the list ! Try adding some elements using the form below.</h4>
        }
      </div>
    );
  }
}
