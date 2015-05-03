'use strict';

import React from 'react/addons';
import onOpenExternals from 'myUtils/openExternals';
import enableButton from 'myUtils/enableButton';

export default class IssueCard extends React.Component {
  onDelete(issue) {
    this.props.flux.getActions('issues').deleteIssue(issue);
  }
  onToggleIssueState(issue) {
    this.props.flux.getActions('issues').toggleIssueState(issue);
  }
  render() {
    const { issue } = this.props;

    return (
      <li>
        <div>
          <span className={issue.card_icon_class}></span>
          <span className="slug">{issue.slug}</span>
          <span className="number">#{issue.number}</span>
          <span className="state">{issue.state}</span>
        </div>
        <div className="title">
          <a href={issue.html_url} onClick={onOpenExternals.bind(this)}>
            {issue.title}
          </a>
        </div>
        <div className="body_text">
          {issue.body_text_short}
        </div>
        <div className="opened">
          <span className="time">opened {issue.created_at}</span>
          <span className="by">by <img src={issue.user.avatar_url} style={{width: '20px', height: '20px'}} /> {issue.user.login}</span>
        </div>
        <div className="updated">
          <span className="time">updated {issue.updated_at}</span>
        </div>
        <div className="closed">
          <span className="time">closed {issue.closed_at}</span>
        </div>
        <div>
          <button
            className="btn btn-default btn-sm"
            {...enableButton(issue.button_close_issue)}
            onClick={this.onToggleIssueState.bind(this, issue)}
            >
            Close Issue
          </button>
          <button
            className="btn btn-default btn-sm"
            {...enableButton(issue.button_reopen_issue)}
            onClick={this.onDelete.bind(this, issue)}
            >
            ReOpen Issue
          </button>
          <button
            className="btn btn-default btn-sm"
            {...enableButton(issue.button_merge_pull_request)}
            onClick={this.onDelete.bind(this, issue)}
            >
            Merge Pull Request
          </button>
          <button
            className="btn btn-default btn-sm"
            {...enableButton(issue.button_delete_branch)}
            onClick={this.onDelete.bind(this, issue)}
            >
            Delete Branch
          </button>
          <button
            className="btn btn-default btn-sm"
            {...enableButton(issue.button_restore_branch)}
            onClick={this.onDelete.bind(this, issue)}
            >
            Restore Branch
          </button>
          <button
            className="btn btn-default btn-sm"
            {...enableButton(issue.button_snooze)}
            onClick={this.onDelete.bind(this, issue)}
            >
            Snooze
          </button>
        </div>
      </li>
    );
  }
}
