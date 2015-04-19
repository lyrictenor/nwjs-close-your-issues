'use strict';
import React from 'react';
import { RouteHandler, Link } from 'react-router';
import FluxComponent from 'flummox/component';

class AppHandler extends React.Component {
  componentDidMount() {
    //fetch issues
  }

  render() {
    return (
      <div className='main container'>
        <FluxComponent {...this.props} connectToStores={['issues']}>
          <header>
            Title here...
            <ul>
              <li><Link to="issues">Issues</Link></li>
              <li><Link to="settings">Settings</Link></li>
            </ul>
          </header>
            {/* this is the important part */}
          <RouteHandler/>
        </FluxComponent>
      </div>
    );
  }
}

export default AppHandler;
