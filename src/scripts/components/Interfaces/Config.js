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
        <button
          className="btn btn-danger"
          type="submit"
          onClick={this.onClearAllData.bind(this)} >
          Clear local data
        </button>
        <ConfigForm {...this.props} />
      </div>
    );
  }
}

export default InterfaceConfig;
