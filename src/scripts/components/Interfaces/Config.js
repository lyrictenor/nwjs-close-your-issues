'use strict';

import React from 'react/addons';
import UIPageHeader from 'components/UI/PageHeader';
import ConfigForm from 'components/Config/ConfigForm';
import FluxComponent from 'flummox/component';

class InterfaceConfig extends React.Component {
  onClearAllData(){
    this.props.flux.getActions('config').clearAllData();
  }

  render() {
    return (
      <div>
        <UIPageHeader icon="gear" text={'Config'} />
        <FluxComponent {...this.props} connectToStores={{
          config: store => ({
            settings: store.getSettings()
          })
        }}>
          <ConfigForm />
        </FluxComponent>
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
