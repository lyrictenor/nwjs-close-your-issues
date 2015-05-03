"use strict";

import React from "react/addons";
import { Link } from "react-router";
import onOpenExternals from "myUtils/openExternals";
import cx from "classnames";

const repoUrl = require("../../../../package.json").repository.url;

class UINavbar extends React.Component {
  render() {

    //const user = this.props.flux.getUser();

    return (
      <div className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="issue" className="navbar-brand">
              <img src="assets/images/closed40.svg" style={{width: "40px", height: "40px"}} />
            </Link>
          </div>

          <ul className="nav navbar-nav">
            <li className={cx({active: this.context.router.isActive("/")})}>
              <Link to="issue">
                <i className="octicon octicon-issue-opened"></i> Issues
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav">
            <li className={cx({active: this.context.router.isActive("config")})}>
              <Link to="config">
                <i className="octicon octicon-gear"></i> Config
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav">
            <li className={cx({active: this.context.router.isActive("about")})}>
              <Link to="about">
                <i className="octicon octicon-beer"></i> About
              </Link>
            </li>
          </ul>

          <ul className="nav navbar-nav pull-right">
            <li>
              <a href={repoUrl} onClick={onOpenExternals.bind(this, repoUrl)}>
                <i className="octicon octicon-mark-github"></i> nwjs-close-your-issues
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

UINavbar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default UINavbar;
