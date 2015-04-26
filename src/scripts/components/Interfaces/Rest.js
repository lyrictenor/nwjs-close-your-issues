'use strict';

import React from 'react/addons';
import UIPageHeader from '../UI/PageHeader';
import IssueList from '../Issue/IssueList';
import IssueForm from '../Issue/IssueForm';

let InterfaceRest = React.createClass({
    render() {

        const handleAdd = (title) => { this.props.flux.getActions('issues').createIssue(title); };

        return (
            <div>
                <UIPageHeader icon="gear" text='Issues' />

                <IssueList {...this.props} />
                <IssueForm {...this.props} onAdd={handleAdd} />
            </div>
        );
    }
});

module.exports = InterfaceRest;
