'use strict';
import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';
import Flux from './Flux';
import routes from './routes.jsx';
import performRouteHandlerStaticMethod from './utils/performRouteHandlerStaticMethod';
import url from 'url';

// Initialize flux
const flux = new Flux();

const router = Router.create({
  routes: routes
});

// Render app
router.run((Handler, state) => {
  const routeHandlerInfo = { state, flux };

  performRouteHandlerStaticMethod(state.routes, 'routerWillRun', routeHandlerInfo).then(
    React.render(
      <FluxComponent flux={flux}>
        <Handler {...state} />
      </FluxComponent>,
      document.getElementById('close-your-issues-app')
    )
  );
});
//
//// Intercept local route changes
//document.onclick = event => {
//  const { toElement: target } = event;
//
//  if (!target) return;
//
//  if (target.tagName !== 'A') return;
//
//  const href = target.getAttribute('href');
//
//  if (!href) return;
//
//  const resolvedHref = url.resolve(window.location.href, href);
//  const { host, path } = url.parse(resolvedHref);
//
//  if (host === window.location.host) {
//    event.preventDefault();
//    router.transitionTo(path);
//  }
//};
