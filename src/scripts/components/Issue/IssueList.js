'use strict';

import React from 'react/addons';
import GithubUrl from 'github-url-to-object';
import onOpenExternals from 'myUtils/openExternals';

class IssueList extends React.Component {
  //TODO move this to business logic
  getSlug(repo) {
    let GithubObject = GithubUrl(repo);
    return `${GithubObject.user}/${GithubObject.repo}`;
  }
  //TODO move this to business logic
  trimWidth(string, length=100) {
    return `${string.slice(0, length)}...`;
  }

  render() {
    const onDelete = (issue) => {
      this.props.flux.getActions('issues').deleteIssue(issue);
    };

    const issues = this.props.issues.map(issue =>
        <li>
          <div>
            <span className="octicon octicon-issue-opened"></span>
            <a href={issue.html_url} onClick={onOpenExternals.bind(this)}>
              {issue.title}
            </a>
          </div>
          <div>
            #{issue.number}
            opened {issue.created_at}
            by <img src={issue.user.avatar_url} style={{width: '20px', height: '20px'}} /> {issue.user.login}
          </div>
          <div>
            {this.getSlug(issue.html_url)}
          </div>
          <div>
            {this.trimWidth(issue.body_text)}
          </div>
          <div>
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

}

export default IssueList;
