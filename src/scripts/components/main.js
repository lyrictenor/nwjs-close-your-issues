'use strict';

import React from 'react';
import Router from 'react-router';
import Immutable from 'immutable';

import { AppFlux } from '../flux/AppFlux';

import App from './App';
import InterfaceHome from './Interfaces/Home';
import InterfaceRest from './Interfaces/Rest';

try {

    require('../../styles/main.scss');
    require('bootstrap/dist/css/bootstrap.css');
    require('font-awesome/css/font-awesome.css');
    require('octicons/octicons/octicons.css');
    require('../browser/nwjs');

    const config = JSON.parse(window.unescape(document.getElementsByName('config/app')[0].content));
    const flux = new AppFlux(config);

    const Route = Router.Route,
        DefaultRoute = Router.DefaultRoute;

    var Interfaces = (
      <Route name="home" path="/" handler={App}>
        <DefaultRoute handler={InterfaceHome} />
        <Route name="rest" path="/rest" handler={InterfaceRest} />
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
