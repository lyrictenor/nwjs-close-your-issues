'use strict';
import React from 'react';
import { RouteHandler, Link } from 'react-router';

let App = React.createClass({

  render() {
    let { context } = this.props;

    return (
      <div>
        <header>
          Title here...
          <ul>
            <li><Link to="issues">Issues</Link></li>
            <li><Link to="settings">Settings</Link></li>
          </ul>
        </header>
          {/* this is the important part */}
        <RouteHandler/>
      </div>
    );
  }
});

export default App;
