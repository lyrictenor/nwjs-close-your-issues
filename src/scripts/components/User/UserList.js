"use strict";

import React from "react/addons";

export default class UserList extends React.Component {
  render() {
    const { users, ...props } = this.props;
    const userCards = users.map(user =>
      <div>{user.id}: {user.login}</div>
    );

    return (
      <div>
        {userCards.size > 0 ?
          <ul className="user-list alternatives list-unstyled">{userCards}</ul>
          :
          <h4>Nothing in the list ! Try adding some elements using the form below.</h4>
        }
      </div>
    );
  }
}
