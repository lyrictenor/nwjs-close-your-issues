'use strict';

import React from 'react/addons';
import UIPageHeader from '../UI/PageHeader';
import ConfigForm from '../Config/ConfigForm';

let InterfaceConfig = React.createClass({
  render() {
    return (
      <div>
        <UIPageHeader icon="gear" text={'Config'} />
        <ConfigForm {...this.props} />
      </div>
    );
  }
});

module.exports = InterfaceConfig;
