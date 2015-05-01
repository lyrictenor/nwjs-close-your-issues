'use strict';

import React from 'react/addons';
import Router from 'react-router';
import FluxComponent from 'flummox/component';

import UINavbar from 'components/UI/Navbar';

const RouteHandler = Router.RouteHandler;

class App extends React.Component {

  async delayFunction(msec) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve();
      }, msec);
    });
  }

  async componentDidMount() {
    await this.delayFunction(3000);
    this.props.flux.getActions('issues').fetchIssues();
  }

  render() {

    return (
      <div className='main container-fluid'>
        <FluxComponent {...this.props} connectToStores={['issues', 'config']}>
          <UINavbar />
          <RouteHandler />
        </FluxComponent>
      </div>
    );
  }
}

export default App;
