'use strict';

import React from 'react/addons';
import {Link, State} from 'react-router';
import onOpenExternals from '../../utils/openExternals';
import cx from 'classnames';

const repoUrl = require('../../../../package.json').repository.url;

let UINavbar = React.createClass({
  mixins: [State],
  render() {

    //const user = this.props.flux.getUser();

    return (
      <div className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="home" className="navbar-brand">
              <img src="assets/images/closed40.svg" style={{width: '40px', height: '40px'}} />
            </Link>
          </div>

          <ul className="nav navbar-nav">
            <li className={cx({active: this.isActive('rest')})}>
              <Link to="rest">
                <i className="octicon octicon-issue-opened"></i> Issues
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav">
            <li className={cx({active: this.isActive('config')})}>
              <Link to="config">
                <i className="octicon octicon-gear"></i> Config
              </Link>
            </li>
          </ul>

          <ul className="nav navbar-nav pull-right">
            <li>
              <a href={repoUrl} onClick={onOpenExternals.bind(this)}>
                <i className="octicon octicon-mark-github"></i> nwjs-close-your-issues
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = UINavbar;
