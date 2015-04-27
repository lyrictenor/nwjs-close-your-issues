'use strict';

import React from 'react/addons';
import UIPageHeader from '../UI/PageHeader';
import IssueList from '../Issue/IssueList';

class InterfaceRest extends React.Component {
  render() {
    return (
      <div>
        <UIPageHeader icon="gear" text='Issues' />

        <IssueList {...this.props} />
      </div>
    );
  }
}

export default InterfaceRest;
