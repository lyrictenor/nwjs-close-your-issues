'use strict';

import React from 'react';
import Router from 'react-router';
import Immutable from 'immutable';

import { AppFlux } from '../flux/AppFlux';

import App from './App';
import InterfaceHome from './Interfaces/Home';
import InterfaceIssue from './Interfaces/Issue';
import InterfaceConfig from './Interfaces/Config';

try {

    require('../../styles/main.less');
    require('bootstrap/dist/css/bootstrap.css');
    require('font-awesome/css/font-awesome.css');
    require('octicons/octicons/octicons.css');
    require('../browser/nwjs');

    const flux = new AppFlux();

    const Route = Router.Route,
        DefaultRoute = Router.DefaultRoute;

    var Interfaces = (
      <Route name="home" path="/" handler={App}>
        <DefaultRoute handler={InterfaceHome} />
        <Route name="issue" path="/issue" handler={InterfaceIssue} />
        <Route name="config" path="/config" handler={InterfaceConfig} />
      </Route>
    );

    Router.run(Interfaces, function (Handler) {
        React.render(<Handler flux={flux} />, document.getElementById('app'));
    });
} catch(e) {
    React.render(
        <div>
            <h2>Error: application could not load</h2>
            <pre>
                <strong>{e.toString()}</strong>
                {!!e.stack && (<div><br />{e.stack}</div>)}
            </pre>
        </div>, document.body
    );

    throw e;
}
