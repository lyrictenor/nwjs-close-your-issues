'use strict';

import React from 'react/addons';
import onOpenExternals from 'myUtils/openExternals';

export default class IssueCard extends React.Component {
  //TODO move this to business logic
  trimWidth(string, length=100) {
    return `${string.slice(0, length)}...`;
  }

  render() {
    const onDelete = (targetIssue) => {
      this.props.flux.getActions('issues').deleteIssue(targetIssue);
    };

    const { issue } = this.props;

    return (
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
          {issue.slug}
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
  }
}
