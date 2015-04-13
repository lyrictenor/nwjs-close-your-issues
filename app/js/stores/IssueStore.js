import { Store } from 'flummox';
import { Map } from 'immutable';

export default class IssueStore extends Store {
  constructor({ issueActions }) {
    super();

    this.register(issueActions.getIssues, this.handleIssues);

    this.state = {
      issues: new Map()
    };
  }
  handleIssues(allIssues) {
    const issues = allIssues.reduce((result, issue) => {
      result[issue.id] = issue;
      return result;
    }, {});

    this.setState({
      issues: this.state.issues.merge(issues)
    });
  }
  getIssues() {
    return Object.keys(this.state.issues).map(
        id => this.state.issues[id]
    );
  }
}
