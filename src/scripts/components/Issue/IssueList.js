'use strict';

import React from 'react/addons';
import GithubUrl from 'github-url-to-object';

let IssueList = React.createClass({

    componentWillMount() { this.props.flux.getStore('issues').addListener('change', this.onIssueStoreChange); },

    componentWillUnmount() { this.props.flux.getStore('issues').removeListener('change', this.onIssueStoreChange); },

    onIssueStoreChange() { this.setState({ issues: this.props.flux.getStore('issues').getIssues() }); },

    //TODO move this to business logic
    getSlug(repo) {
      let GithubObject = GithubUrl(repo);
      return `${GithubObject.user}/${GithubObject.repo}`;
    },
    //TODO move this to business logic
    trimWidth(string, length=100) {
      return `${string.slice(0, length)}...`;
    },

    render() {
      const onDelete = (issue) => this.props.flux.getActions('issues').deleteIssue(issue);
      const issues = this.props.issues.map(issue =>
          <li>
            <div className="row-fluid">
              <div className="col-xs-12">
                <div className="row-fluid">
                  <div className="col-xs-12">
                    <span className="octicon octicon-issue-opened"></span>
                    {issue.title}
                  </div>
                </div>
                <div className="row-fluid">
                  <div className="col-xs-12">
                    #{issue.number}
                    opened {issue.created_at}
                    by <img src={issue.user.avatar_url} style={{width: '20px', height: '20px'}} /> {issue.user.login}
                  </div>
                </div>
                <div className="row-fluid">
                  <div className="col-xs-12">
                    {this.getSlug(issue.html_url)}
                    {this.trimWidth(issue.body_text)}
                  </div>
                </div>
                <div className="row-fluid">
                  <div className="col-xs-12">
                    <button className="btn btn-default btn-sm" onClick={onDelete.bind(this, issue)}>
                      Delete Branch
                    </button>
                    <button className="btn btn-default btn-sm" onClick={onDelete.bind(this, issue)}>
                      Close Issue
                    </button>
                    <button className="btn btn-default btn-sm" onClick={onDelete.bind(this, issue)}>
                      Merge Pull Request
                    </button>
                    <button className="btn btn-default btn-sm" onClick={onDelete.bind(this, issue)}>
                      Snooze
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
      );

        return (
            <div>
              {issues.size > 0 ?
                <ul className="alternatives list-unstyled">{issues}</ul>
                :
                <h4>Nothing in the list ! Try adding some elements using the form below.</h4>
              }
            </div>
        );
    }

});

module.exports = IssueList;
