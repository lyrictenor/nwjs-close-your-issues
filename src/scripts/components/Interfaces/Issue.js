'use strict';

import React from 'react/addons';
import UIPageHeader from '../UI/PageHeader';
import IssueList from '../Issue/IssueList';

class InterfaceIssue extends React.Component {
  render() {
    const onFetch = () => {
      this.props.flux.getActions('issues').fetchIssues();
    };

    return (
      <div>
        <UIPageHeader icon="gear" text='Issues' />
        <button
          className="btn btn-default"
          type="submit"
          onClick={onFetch.bind(this)} >
          Fetch Issues
        </button>

        <IssueList {...this.props} />
      </div>
    );
  }
}

export default InterfaceIssue;
