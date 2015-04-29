'use strict';

import React from 'react/addons';
import Router from 'react-router';
import FluxComponent from 'flummox/component';

import UINavbar from 'components/UI/Navbar';

const RouteHandler = Router.RouteHandler;

class App extends React.Component {

  componentDidMount() {
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
