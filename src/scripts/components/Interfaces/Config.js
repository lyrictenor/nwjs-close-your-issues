'use strict';

import React from 'react/addons';
import UIPageHeader from 'components/UI/PageHeader';
import ConfigForm from 'components/Config/ConfigForm';

class InterfaceConfig extends React.Component {
  onClearAllData(){
    this.props.flux.getActions('config').clearAllData();
  }

  render() {
    return (
      <div>
        <UIPageHeader icon="gear" text={'Config'} />
        <ConfigForm {...this.props} />
        <div style={{ height: '100px' }} />
        <button
          className="btn btn-danger btn-block"
          type="submit"
          onClick={this.onClearAllData.bind(this)} >
          CLEAR ALL LOCAL DATA
        </button>
      </div>
    );
  }
}

export default InterfaceConfig;
