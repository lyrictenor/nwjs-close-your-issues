'use strict';

import React from 'react/addons';
import Router from 'react-router';
import FluxComponent from 'flummox/component';

import UINavbar from './UI/Navbar';

const RouteHandler = Router.RouteHandler;

let App = React.createClass({

    componentDidMount() { this.props.flux.getActions('issues').fetchIssues(); },

    render() {

        return (
            <div className='main container-fluid'>
                <FluxComponent {...this.props} connectToStores={['issues']}>
                    <UINavbar />
                    <RouteHandler />
                </FluxComponent>
            </div>
        );
    }
});

module.exports = App;
