'use strict';
import React from 'react';
import Context from './Context';
import App from './components/App.jsx';

let context = new Context();
//let action = context.appAction;

//action.getAllProducts();

React.render(
  React.createElement(App, { context }),
  window.document.getElementById('close-your-issues-app')
);
