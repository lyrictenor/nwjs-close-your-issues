'use strict';

import React from 'react/addons';
import UIPageHeader from 'components/UI/PageHeader';
import IssueList from 'components/Issue/IssueList';
import FluxComponent from 'flummox/component';

class InterfaceIssue extends React.Component {
  onFetch() {
    this.props.flux.getActions('issues').fetchIssues();
  }
  onClear() {
    this.props.flux.getActions('issues').clearIssues();
  }
  render() {
    return (
      <div>
        <UIPageHeader icon="gear" text='Issues' />
        <button
          className="btn btn-default"
          type="submit"
          onClick={this.onFetch.bind(this)} >
          Fetch Issues
        </button>

        <button
          className="btn btn-default"
          type="submit"
          onClick={this.onClear.bind(this)} >
          Clear Issues
        </button>
        <FluxComponent {...this.props} connectToStores={['issues']}>
          <IssueList />
        </FluxComponent>
      </div>
    );
  }
}

export default InterfaceIssue;
