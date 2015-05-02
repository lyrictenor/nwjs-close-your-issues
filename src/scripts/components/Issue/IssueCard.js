'use strict';

import React from 'react/addons';
import onOpenExternals from 'myUtils/openExternals';
import enableButton from 'myUtils/enableButton';

export default class IssueCard extends React.Component {
  render() {
    const onDelete = (targetIssue) => {
      this.props.flux.getActions('issues').deleteIssue(targetIssue);
    };

    const { issue } = this.props;

    return (
      <li>
        <div>
          <span className={issue.card_icon_class}></span>
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
          {issue.body_text_short}
        </div>
        <div>
          <button
            className="btn btn-default btn-sm"
            {...enableButton(issue.button_delete_branch)}
            onClick={onDelete.bind(this, issue)}
            >
            Delete Branch
          </button>
          <button
            className="btn btn-default btn-sm"
            {...enableButton(issue.button_close_issue)}
            onClick={onDelete.bind(this, issue)}
            >
            Close Issue
          </button>
          <button
            className="btn btn-default btn-sm"
            {...enableButton(issue.button_merge_pull_request)}
            onClick={onDelete.bind(this, issue)}
            >
            Merge Pull Request
          </button>
          <button
            className="btn btn-default btn-sm"
            {...enableButton(issue.button_snooze)}
            onClick={onDelete.bind(this, issue)}
            >
            Snooze
          </button>
        </div>
      </li>
    );
  }
}
