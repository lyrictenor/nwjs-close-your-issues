"use strict";

import React from "react/addons";
import UIPageHeader from "components/UI/PageHeader";
import FluxComponent from "flummox/component";
import PullRequestList from "components/PullRequest/PullRequestList";

class InterfacePullRequest extends React.Component {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <UIPageHeader icon="gear" text="PullRequests" />
        <FluxComponent
          {...props}
          connectToStores={{
            pullRequests: store => ({
              pullRequests: store.getData()
            })
          }}
          >
          <PullRequestList />
        </FluxComponent>
      </div>
    );
  }
}

export default InterfacePullRequest;
