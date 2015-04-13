'use strict';
import React from 'react';
import Flux from 'flummox/component';
import Issue from './Issue.jsx';

class IssueHandler extends React.Component {

  render() {
    return (
      <div>
        <Flux
          connectToStores={{
            issues: (store, props) => ({
              issue: store.getIssues()
            })
          }}
          render={({ issue }) => <Issue issue={issue} />}
        />
      </div>
    );
  }
}

export default IssueHandler;
