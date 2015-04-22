'use strict';

import React from 'react/addons';

let IssueList = React.createClass({

    componentWillMount() { this.props.flux.getStore('issues').addListener('change', this.onIssueStoreChange); },

    componentWillUnmount() { this.props.flux.getStore('issues').removeListener('change', this.onIssueStoreChange); },

    onIssueStoreChange() { this.setState({ issues: this.props.flux.getStore('issues').getIssues() }); },

    render() {

        const onDelete = (issue) => this.props.flux.getActions('issues').deleteIssue(issue);

        return (
            <div>
                {!this.props.issues && (<h4>Nothing in the list ! Try adding some elements using the form below.</h4>)}
                {this.props.issues && this.props.issues.map((issue) =>
                    <p><button className="btn btn-default btn-sm" onClick={onDelete.bind(this, issue)}>Done</button>{issue.id} {issue.title} - {issue.state} {issue.user.login} {issue.user.avatar_url}</p>
                ).toJS()}
            </div>
        );
    }

});

module.exports = IssueList;
