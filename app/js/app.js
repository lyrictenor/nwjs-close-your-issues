'use strict';
import React from 'react';
import Context from './Context';
import App from './components/App.jsx';

let context = new Context();
let action = context.appAction;

React.render(
  React.createElement(App, { context }),
  document.getElementById('close-your-issues-app')
);
