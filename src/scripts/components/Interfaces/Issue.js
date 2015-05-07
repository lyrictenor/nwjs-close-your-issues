"use strict";

import React from "react/addons";
import UIPageHeader from "components/UI/PageHeader";
import IssueList from "components/Issue/IssueList";
import IssueHeader from "components/Issue/IssueHeader";
import FluxComponent from "flummox/component";

class InterfaceIssue extends React.Component {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <UIPageHeader icon="gear" text="Issues" />
        <IssueHeader
          {...props}
          />
        <FluxComponent
          {...props}
          connectToStores={{
            issues: store => ({
              issues: store.getIssues()
            })
          }}
          >
          <IssueList />
        </FluxComponent>
      </div>
    );
  }
}

export default InterfaceIssue;
