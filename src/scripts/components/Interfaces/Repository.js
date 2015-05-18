"use strict";

import React from "react/addons";
import UIPageHeader from "components/UI/PageHeader";
import FluxComponent from "flummox/component";
import RepositoryList from "components/Repository/RepositoryList";

class InterfaceRepository extends React.Component {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <UIPageHeader icon="gear" text="Repositories" />
        <FluxComponent
          {...props}
          connectToStores={{
            repositories: store => ({
              repositories: store.getData()
            })
          }}
          >
          <RepositoryList />
        </FluxComponent>
      </div>
    );
  }
}

export default InterfaceRepository;
