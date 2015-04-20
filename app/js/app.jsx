'use strict';
import React from 'react';
import Router from 'react-router';
import Flux from './Flux';
import routes from './routes.jsx';

// Initialize flux
const flux = new Flux();

Router.run(routes, function (Handler) {
  React.render(<Handler flux={flux} />,
    document.getElementById('close-your-issues-app'));
});
