"use strict";

import React from "react/addons";
import UIPageHeader from "components/UI/PageHeader";
import FluxComponent from "flummox/component";
import UserList from "components/User/UserList";

class InterfaceUser extends React.Component {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <UIPageHeader icon="gear" text="Users" />
        <FluxComponent
          {...props}
          connectToStores={{
            users: store => ({
              users: store.getData()
            })
          }}
          >
          <UserList />
        </FluxComponent>
      </div>
    );
  }
}

export default InterfaceUser;
