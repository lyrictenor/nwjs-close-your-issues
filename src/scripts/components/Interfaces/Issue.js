"use strict";

import React from "react/addons";
import UIPageHeader from "components/UI/PageHeader";
import IssueList from "components/Issue/IssueList";
import IssueHeader from "components/Issue/IssueHeader";
import FluxComponent from "flummox/component";

class InterfaceIssue extends React.Component {
  render() {
    return (
      <div>
        <UIPageHeader icon="gear" text="Issues" />
        <IssueHeader {...this.props} />
        <FluxComponent {...this.props} connectToStores={["issues"]}>
          <IssueList />
        </FluxComponent>
      </div>
    );
  }
}

export default InterfaceIssue;
