'use strict';

import React from 'react/addons';
import {Link, State} from 'react-router';

const repoUrl = require('../../../../package.json').repository.url;
const cx = React.addons.classSet;

let UINavbar = React.createClass({
    mixins: [State],
    render() {

        const user = this.props.flux.getUser();

        return (
            <div className="navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <Link to="home" className="navbar-brand"><img src="assets/images/closed40.svg" style={{height: '60px', position: 'absolute', top: '5px'}} /> <div style={{marginLeft: '80px', fontSize: '1.3em'}}>Close Your Issues</div></Link>
                    </div>

                    <ul className="nav navbar-nav">
                        <li className={cx({active: this.isActive('rest')})}><Link to="rest">Issues</Link></li>
                    </ul>

                    <ul className="nav navbar-nav pull-right">
                        <li><a href={repoUrl}>Browse the code on <i className="fa fa-github"></i> GitHub</a></li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = UINavbar;
