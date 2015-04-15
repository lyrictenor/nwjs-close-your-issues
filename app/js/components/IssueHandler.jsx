'use strict';
import React from 'react';
import Flux from 'flummox/component';
import IssueList from './IssueList.jsx';

class IssueHandler extends React.Component {

  render() {
    return (
      <div>
        <Flux
          connectToStores={{
            issues: store => ({
              issues: store.state.issues
            })
          }}>
          <IssueList />
        </Flux>
      </div>
    );
  }
}

export default IssueHandler;
