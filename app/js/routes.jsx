'use strict';
import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import AppHandler from './components/AppHandler.jsx';
import IssuesHandler from './components/IssuesHandler.jsx';
import SettingsHandler from './components/SettingsHandler.jsx';

let Routes = (
  <Route name="app" path="/" handler={AppHandler}>
    <Route name="settings" path="/settings" handler={SettingsHandler}/>
    <DefaultRoute name="issues" handler={IssuesHandler}/>
  </Route>
);

export default Routes;
