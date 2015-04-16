'use strict';
import React from 'react';
import Flux from 'flummox/component';
import IssueList from './IssueList.jsx';

class IssueHandler extends React.Component {
  render() {
    return (
      <Flux
        connectToStores="issues"
        render={storeState => {
          return <div {...storeState} />
        }}
      />
    );
  }
}

export default IssueHandler;
