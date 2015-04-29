'use strict';

import React from 'react/addons';
import UIPageHeader from 'components/UI/PageHeader';
import ConfigForm from 'components/Config/ConfigForm';

class InterfaceConfig extends React.Component {
  render() {
    return (
      <div>
        <UIPageHeader icon="gear" text={'Config'} />
        <ConfigForm {...this.props} />
      </div>
    );
  }
}

export default InterfaceConfig;
