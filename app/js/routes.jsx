'use strict';
import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import AppHandler from './components/AppHandler.jsx';
import IssueHandler from './components/IssueHandler.jsx';
import SettingHandler from './components/SettingHandler.jsx';

export default (
  <Route name="app" path="/" handler={AppHandler}>
    <Route name="settings" path="/settings" handler={SettingHandler}/>
    <DefaultRoute name="issues" handler={IssueHandler}/>
  </Route>
);
