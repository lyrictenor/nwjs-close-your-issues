"use strict";

import React from "react";
import Router from "react-router";
import Immutable from "immutable";

import AppFlux from "../flux/AppFlux";

import App from "components/App";
import InterfaceAbout from "components/Interfaces/About";
import InterfaceIssue from "components/Interfaces/Issue";
import InterfaceRepository from "components/Interfaces/Repository";
import InterfacePullRequest from "components/Interfaces/PullRequest";
import InterfaceUser from "components/Interfaces/User";
import InterfaceConfig from "components/Interfaces/Config";

try {

    require("styles/main.less");
    require("../browser/nwjs");

    const flux = new AppFlux();

    const Route = Router.Route,
        DefaultRoute = Router.DefaultRoute;

    var Interfaces = (
      <Route name="issue" path="/" handler={App}>
        <DefaultRoute handler={InterfaceIssue} />
        <Route name="config" path="/config" handler={InterfaceConfig} />
        <Route name="about" path="/about" handler={InterfaceAbout} />
        <Route name="repository" path="/repository" handler={InterfaceRepository} />
        <Route name="pullRequest" path="/pullrequest" handler={InterfacePullRequest} />
        <Route name="user" path="/user" handler={InterfaceUser} />
      </Route>
    );

    Router.run(Interfaces, function (Handler) {
        React.render(<Handler flux={flux} />, document.getElementById("app"));
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
