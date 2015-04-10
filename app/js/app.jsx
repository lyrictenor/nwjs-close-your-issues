'use strict';
import React from 'react';
import Router from 'react-router';
import routes from './routes.jsx';
import Context from './Context';

let context = new Context();
let action = context.appAction;

action.getIssues();

Router.run(routes, (Handler) => {
  React.render(
    <Handler context={context} />,
    window.document.getElementById('close-your-issues-app')
  );
});
