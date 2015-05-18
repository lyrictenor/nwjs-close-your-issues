"use strict";

import React from "react/addons";

export default class RepositoryList extends React.Component {
  render() {
    const { repositories, ...props } = this.props;
    const repositoryCards = repositories.map(repository =>
      <div>{repository.id}: {repository.name} {repository.full_name}</div>
    );

    return (
      <div>
        {repositoryCards.size > 0 ?
          <ul className="repository-list alternatives list-unstyled">{repositoryCards}</ul>
          :
          <h4>Nothing in the list ! Try adding some elements using the form below.</h4>
        }
      </div>
    );
  }
}
