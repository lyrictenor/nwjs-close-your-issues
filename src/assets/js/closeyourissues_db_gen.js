goog.provide('closeyourissues.db.row.Commits');
goog.provide('closeyourissues.db.row.CommitsDbType');
goog.provide('closeyourissues.db.row.CommitsType');
goog.provide('closeyourissues.db.row.Issues');
goog.provide('closeyourissues.db.row.IssuesDbType');
goog.provide('closeyourissues.db.row.IssuesType');
goog.provide('closeyourissues.db.row.Milestones');
goog.provide('closeyourissues.db.row.MilestonesDbType');
goog.provide('closeyourissues.db.row.MilestonesType');
goog.provide('closeyourissues.db.row.Organizations');
goog.provide('closeyourissues.db.row.OrganizationsDbType');
goog.provide('closeyourissues.db.row.OrganizationsType');
goog.provide('closeyourissues.db.row.PullRequests');
goog.provide('closeyourissues.db.row.PullRequestsDbType');
goog.provide('closeyourissues.db.row.PullRequestsType');
goog.provide('closeyourissues.db.row.Repositories');
goog.provide('closeyourissues.db.row.RepositoriesDbType');
goog.provide('closeyourissues.db.row.RepositoriesType');
goog.provide('closeyourissues.db.row.Users');
goog.provide('closeyourissues.db.row.UsersDbType');
goog.provide('closeyourissues.db.row.UsersType');
goog.provide('closeyourissues.db.schema.Commits');
goog.provide('closeyourissues.db.schema.Database');
goog.provide('closeyourissues.db.schema.Issues');
goog.provide('closeyourissues.db.schema.Milestones');
goog.provide('closeyourissues.db.schema.Organizations');
goog.provide('closeyourissues.db.schema.PullRequests');
goog.provide('closeyourissues.db.schema.Repositories');
goog.provide('closeyourissues.db.schema.Users');

/** @suppress {extraRequire} */
goog.require('lf.Order');
goog.require('lf.Row');
goog.require('lf.Type');
goog.require('lf.schema.BaseColumn');
goog.require('lf.schema.Constraint');
goog.require('lf.schema.Database');
goog.require('lf.schema.Index');
goog.require('lf.schema.Table');



/**
 * @implements {lf.schema.Database}
 * @constructor
 */
closeyourissues.db.schema.Database = function() {
  /** @private {!Object} */
  this.tableMap_ = {};

  /** @private {!lf.schema.Database.Pragma} */
  this.pragma_ = {
    enableBundledMode: false
  };

  /** @private {!closeyourissues.db.schema.Issues} */
  this.issues_ = new closeyourissues.db.schema.Issues();
  this.tableMap_['Issues'] = this.issues_;

  /** @private {!closeyourissues.db.schema.Users} */
  this.users_ = new closeyourissues.db.schema.Users();
  this.tableMap_['Users'] = this.users_;

  /** @private {!closeyourissues.db.schema.Milestones} */
  this.milestones_ = new closeyourissues.db.schema.Milestones();
  this.tableMap_['Milestones'] = this.milestones_;

  /** @private {!closeyourissues.db.schema.PullRequests} */
  this.pullRequests_ = new closeyourissues.db.schema.PullRequests();
  this.tableMap_['PullRequests'] = this.pullRequests_;

  /** @private {!closeyourissues.db.schema.Commits} */
  this.commits_ = new closeyourissues.db.schema.Commits();
  this.tableMap_['Commits'] = this.commits_;

  /** @private {!closeyourissues.db.schema.Organizations} */
  this.organizations_ = new closeyourissues.db.schema.Organizations();
  this.tableMap_['Organizations'] = this.organizations_;

  /** @private {!closeyourissues.db.schema.Repositories} */
  this.repositories_ = new closeyourissues.db.schema.Repositories();
  this.tableMap_['Repositories'] = this.repositories_;

};


/** @override */
closeyourissues.db.schema.Database.prototype.name = function() {
  return 'close_your_issues';
};


/** @override */
closeyourissues.db.schema.Database.prototype.version = function() {
  return 1;
};


/** @override */
closeyourissues.db.schema.Database.prototype.tables = function() {
  return [
    this.issues_,
    this.users_,
    this.milestones_,
    this.pullRequests_,
    this.commits_,
    this.organizations_,
    this.repositories_
  ];
};


/** @override */
closeyourissues.db.schema.Database.prototype.table = function(tableName) {
  return this.tableMap_[tableName] || null;
};


/** @override */
closeyourissues.db.schema.Database.prototype.pragma = function() {
  return this.pragma_;
};


/** @return {!closeyourissues.db.schema.Issues} */
closeyourissues.db.schema.Database.prototype.getIssues = function() {
  return this.issues_;
};


/** @return {!closeyourissues.db.schema.Users} */
closeyourissues.db.schema.Database.prototype.getUsers = function() {
  return this.users_;
};


/** @return {!closeyourissues.db.schema.Milestones} */
closeyourissues.db.schema.Database.prototype.getMilestones = function() {
  return this.milestones_;
};


/** @return {!closeyourissues.db.schema.PullRequests} */
closeyourissues.db.schema.Database.prototype.getPullRequests = function() {
  return this.pullRequests_;
};


/** @return {!closeyourissues.db.schema.Commits} */
closeyourissues.db.schema.Database.prototype.getCommits = function() {
  return this.commits_;
};


/** @return {!closeyourissues.db.schema.Organizations} */
closeyourissues.db.schema.Database.prototype.getOrganizations = function() {
  return this.organizations_;
};


/** @return {!closeyourissues.db.schema.Repositories} */
closeyourissues.db.schema.Database.prototype.getRepositories = function() {
  return this.repositories_;
};



/**
 * @extends {lf.schema.Table.<!closeyourissues.db.row.IssuesType,
 *     !closeyourissues.db.row.IssuesDbType>}
 * @constructor
 */
closeyourissues.db.schema.Issues = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.id = new lf.schema.BaseColumn(
      this, 'id', true, false, lf.Type.STRING);
  cols.push(this.id);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.owner = new lf.schema.BaseColumn(
      this, 'owner', false, false, lf.Type.STRING);
  cols.push(this.owner);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.repository = new lf.schema.BaseColumn(
      this, 'repository', false, false, lf.Type.STRING);
  cols.push(this.repository);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.url = new lf.schema.BaseColumn(
      this, 'url', false, false, lf.Type.STRING);
  cols.push(this.url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.html_url = new lf.schema.BaseColumn(
      this, 'html_url', false, false, lf.Type.STRING);
  cols.push(this.html_url);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.number = new lf.schema.BaseColumn(
      this, 'number', false, false, lf.Type.INTEGER);
  cols.push(this.number);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.state = new lf.schema.BaseColumn(
      this, 'state', false, false, lf.Type.STRING);
  cols.push(this.state);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.title = new lf.schema.BaseColumn(
      this, 'title', false, false, lf.Type.STRING);
  cols.push(this.title);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.body = new lf.schema.BaseColumn(
      this, 'body', false, false, lf.Type.STRING);
  cols.push(this.body);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.user = new lf.schema.BaseColumn(
      this, 'user', false, false, lf.Type.INTEGER);
  cols.push(this.user);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.assignee = new lf.schema.BaseColumn(
      this, 'assignee', false, false, lf.Type.INTEGER);
  cols.push(this.assignee);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.milestone = new lf.schema.BaseColumn(
      this, 'milestone', false, false, lf.Type.INTEGER);
  cols.push(this.milestone);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.comments = new lf.schema.BaseColumn(
      this, 'comments', false, false, lf.Type.INTEGER);
  cols.push(this.comments);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.pull_request = new lf.schema.BaseColumn(
      this, 'pull_request', false, false, lf.Type.INTEGER);
  cols.push(this.pull_request);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.closed_at = new lf.schema.BaseColumn(
      this, 'closed_at', false, true, lf.Type.DATE_TIME);
  cols.push(this.closed_at);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.created_at = new lf.schema.BaseColumn(
      this, 'created_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.created_at);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.updated_at = new lf.schema.BaseColumn(
      this, 'updated_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.updated_at);

  var indices = [
    new lf.schema.Index('Issues', 'pkIssues', true,
        [
          {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
        ])
  ];

  closeyourissues.db.schema.Issues.base(
      this, 'constructor', 'Issues', cols, indices, false);
};
goog.inherits(closeyourissues.db.schema.Issues, lf.schema.Table);


/** @override */
closeyourissues.db.schema.Issues.prototype.createRow = function(opt_value) {
  return new closeyourissues.db.row.Issues(lf.Row.getNextId(), opt_value);
};


/** @override */
closeyourissues.db.schema.Issues.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.closed_at = goog.isNull(data.closed_at) ?
      null : new Date(data.closed_at);
  data.created_at = new Date(data.created_at);
  data.updated_at = new Date(data.updated_at);
  return new closeyourissues.db.row.Issues(dbRecord['id'], data);
};


/** @override */
closeyourissues.db.schema.Issues.prototype.getConstraint = function() {
  var pk = new lf.schema.Index('Issues', 'pkIssues', true,
      [
        {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
      ]);
  var notNullable = [
    this.id,
    this.owner,
    this.repository,
    this.url,
    this.html_url,
    this.number,
    this.state,
    this.title,
    this.body,
    this.user,
    this.assignee,
    this.milestone,
    this.comments,
    this.pull_request,
    this.created_at,
    this.updated_at
  ];
  var foreignKeys = [];
  var unique = [
  ];
  return new lf.schema.Constraint(pk, notNullable, foreignKeys, unique);
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.IssuesType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.owner;
  /** @export @type {string} */
  this.repository;
  /** @export @type {string} */
  this.url;
  /** @export @type {string} */
  this.html_url;
  /** @export @type {number} */
  this.number;
  /** @export @type {string} */
  this.state;
  /** @export @type {string} */
  this.title;
  /** @export @type {string} */
  this.body;
  /** @export @type {number} */
  this.user;
  /** @export @type {number} */
  this.assignee;
  /** @export @type {number} */
  this.milestone;
  /** @export @type {number} */
  this.comments;
  /** @export @type {number} */
  this.pull_request;
  /** @export @type {?Date} */
  this.closed_at;
  /** @export @type {!Date} */
  this.created_at;
  /** @export @type {!Date} */
  this.updated_at;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.IssuesDbType = function() {
  /** @export @type {string} */
  this.id;
  /** @export @type {string} */
  this.owner;
  /** @export @type {string} */
  this.repository;
  /** @export @type {string} */
  this.url;
  /** @export @type {string} */
  this.html_url;
  /** @export @type {number} */
  this.number;
  /** @export @type {string} */
  this.state;
  /** @export @type {string} */
  this.title;
  /** @export @type {string} */
  this.body;
  /** @export @type {number} */
  this.user;
  /** @export @type {number} */
  this.assignee;
  /** @export @type {number} */
  this.milestone;
  /** @export @type {number} */
  this.comments;
  /** @export @type {number} */
  this.pull_request;
  /** @export @type {?number} */
  this.closed_at;
  /** @export @type {number} */
  this.created_at;
  /** @export @type {number} */
  this.updated_at;
};



/**
 * Constructs a new Issues row.
 * @constructor
 * @extends {lf.Row.<!closeyourissues.db.row.IssuesType,
 *     !closeyourissues.db.row.IssuesDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!closeyourissues.db.row.IssuesType=} opt_payload
 */
closeyourissues.db.row.Issues = function(rowId, opt_payload) {
  closeyourissues.db.row.Issues.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(closeyourissues.db.row.Issues, lf.Row);


/** @override */
closeyourissues.db.row.Issues.prototype.defaultPayload = function() {
  var payload = new closeyourissues.db.row.IssuesType();
  payload.id = '';
  payload.owner = '';
  payload.repository = '';
  payload.url = '';
  payload.html_url = '';
  payload.number = 0;
  payload.state = '';
  payload.title = '';
  payload.body = '';
  payload.user = 0;
  payload.assignee = 0;
  payload.milestone = 0;
  payload.comments = 0;
  payload.pull_request = 0;
  payload.closed_at = null;
  payload.created_at = new Date(0);
  payload.updated_at = new Date(0);
  return payload;
};


/** @override */
closeyourissues.db.row.Issues.prototype.toDbPayload = function() {
  var payload = new closeyourissues.db.row.IssuesDbType();
  payload.id = this.payload().id;
  payload.owner = this.payload().owner;
  payload.repository = this.payload().repository;
  payload.url = this.payload().url;
  payload.html_url = this.payload().html_url;
  payload.number = this.payload().number;
  payload.state = this.payload().state;
  payload.title = this.payload().title;
  payload.body = this.payload().body;
  payload.user = this.payload().user;
  payload.assignee = this.payload().assignee;
  payload.milestone = this.payload().milestone;
  payload.comments = this.payload().comments;
  payload.pull_request = this.payload().pull_request;
  payload.closed_at = goog.isNull(this.payload().closed_at) ?
      null : this.payload().closed_at.getTime();
  payload.created_at = this.payload().created_at.getTime();
  payload.updated_at = this.payload().updated_at.getTime();
  return payload;
};


/** @override */
closeyourissues.db.row.Issues.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Issues.pkIssues':
      return this.payload().id;
    case 'Issues.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
closeyourissues.db.row.Issues.prototype.getId = function() {
  return this.payload().id;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setId = function(value) {
  this.payload().id = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Issues.prototype.getOwner = function() {
  return this.payload().owner;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setOwner = function(value) {
  this.payload().owner = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Issues.prototype.getRepository = function() {
  return this.payload().repository;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setRepository = function(value) {
  this.payload().repository = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Issues.prototype.getUrl = function() {
  return this.payload().url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setUrl = function(value) {
  this.payload().url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Issues.prototype.getHtml_url = function() {
  return this.payload().html_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setHtml_url = function(value) {
  this.payload().html_url = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Issues.prototype.getNumber = function() {
  return this.payload().number;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setNumber = function(value) {
  this.payload().number = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Issues.prototype.getState = function() {
  return this.payload().state;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setState = function(value) {
  this.payload().state = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Issues.prototype.getTitle = function() {
  return this.payload().title;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setTitle = function(value) {
  this.payload().title = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Issues.prototype.getBody = function() {
  return this.payload().body;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setBody = function(value) {
  this.payload().body = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Issues.prototype.getUser = function() {
  return this.payload().user;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setUser = function(value) {
  this.payload().user = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Issues.prototype.getAssignee = function() {
  return this.payload().assignee;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setAssignee = function(value) {
  this.payload().assignee = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Issues.prototype.getMilestone = function() {
  return this.payload().milestone;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setMilestone = function(value) {
  this.payload().milestone = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Issues.prototype.getComments = function() {
  return this.payload().comments;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setComments = function(value) {
  this.payload().comments = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Issues.prototype.getPull_request = function() {
  return this.payload().pull_request;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setPull_request = function(value) {
  this.payload().pull_request = value;
  return this;
};


/** @return {?Date} */
closeyourissues.db.row.Issues.prototype.getClosed_at = function() {
  return this.payload().closed_at;
};


/**
 * @param {?Date} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setClosed_at = function(value) {
  this.payload().closed_at = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.Issues.prototype.getCreated_at = function() {
  return this.payload().created_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setCreated_at = function(value) {
  this.payload().created_at = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.Issues.prototype.getUpdated_at = function() {
  return this.payload().updated_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.Issues}
*/
closeyourissues.db.row.Issues.prototype.setUpdated_at = function(value) {
  this.payload().updated_at = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!closeyourissues.db.row.UsersType,
 *     !closeyourissues.db.row.UsersDbType>}
 * @constructor
 */
closeyourissues.db.schema.Users = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.login = new lf.schema.BaseColumn(
      this, 'login', false, false, lf.Type.STRING);
  cols.push(this.login);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.id = new lf.schema.BaseColumn(
      this, 'id', true, false, lf.Type.INTEGER);
  cols.push(this.id);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.avatar_url = new lf.schema.BaseColumn(
      this, 'avatar_url', false, false, lf.Type.STRING);
  cols.push(this.avatar_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.gravatar_id = new lf.schema.BaseColumn(
      this, 'gravatar_id', false, false, lf.Type.STRING);
  cols.push(this.gravatar_id);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.url = new lf.schema.BaseColumn(
      this, 'url', false, false, lf.Type.STRING);
  cols.push(this.url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.html_url = new lf.schema.BaseColumn(
      this, 'html_url', false, false, lf.Type.STRING);
  cols.push(this.html_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.followers_url = new lf.schema.BaseColumn(
      this, 'followers_url', false, false, lf.Type.STRING);
  cols.push(this.followers_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.following_url = new lf.schema.BaseColumn(
      this, 'following_url', false, false, lf.Type.STRING);
  cols.push(this.following_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.gists_url = new lf.schema.BaseColumn(
      this, 'gists_url', false, false, lf.Type.STRING);
  cols.push(this.gists_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.starred_url = new lf.schema.BaseColumn(
      this, 'starred_url', false, false, lf.Type.STRING);
  cols.push(this.starred_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.subscriptions_url = new lf.schema.BaseColumn(
      this, 'subscriptions_url', false, false, lf.Type.STRING);
  cols.push(this.subscriptions_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.organizations_url = new lf.schema.BaseColumn(
      this, 'organizations_url', false, false, lf.Type.STRING);
  cols.push(this.organizations_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.repos_url = new lf.schema.BaseColumn(
      this, 'repos_url', false, false, lf.Type.STRING);
  cols.push(this.repos_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.events_url = new lf.schema.BaseColumn(
      this, 'events_url', false, false, lf.Type.STRING);
  cols.push(this.events_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.received_events_url = new lf.schema.BaseColumn(
      this, 'received_events_url', false, false, lf.Type.STRING);
  cols.push(this.received_events_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.type = new lf.schema.BaseColumn(
      this, 'type', false, false, lf.Type.STRING);
  cols.push(this.type);

  /** @type {!lf.schema.BaseColumn.<boolean>} */
  this.site_admin = new lf.schema.BaseColumn(
      this, 'site_admin', false, false, lf.Type.BOOLEAN);
  cols.push(this.site_admin);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', false, true, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.company = new lf.schema.BaseColumn(
      this, 'company', false, true, lf.Type.STRING);
  cols.push(this.company);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.blog = new lf.schema.BaseColumn(
      this, 'blog', false, true, lf.Type.STRING);
  cols.push(this.blog);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.location = new lf.schema.BaseColumn(
      this, 'location', false, true, lf.Type.STRING);
  cols.push(this.location);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.email = new lf.schema.BaseColumn(
      this, 'email', false, true, lf.Type.STRING);
  cols.push(this.email);

  /** @type {!lf.schema.BaseColumn.<boolean>} */
  this.hireable = new lf.schema.BaseColumn(
      this, 'hireable', false, false, lf.Type.BOOLEAN);
  cols.push(this.hireable);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.bio = new lf.schema.BaseColumn(
      this, 'bio', false, true, lf.Type.STRING);
  cols.push(this.bio);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.public_repos = new lf.schema.BaseColumn(
      this, 'public_repos', false, false, lf.Type.INTEGER);
  cols.push(this.public_repos);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.public_gists = new lf.schema.BaseColumn(
      this, 'public_gists', false, false, lf.Type.INTEGER);
  cols.push(this.public_gists);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.followers = new lf.schema.BaseColumn(
      this, 'followers', false, false, lf.Type.INTEGER);
  cols.push(this.followers);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.following = new lf.schema.BaseColumn(
      this, 'following', false, false, lf.Type.INTEGER);
  cols.push(this.following);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.created_at = new lf.schema.BaseColumn(
      this, 'created_at', false, true, lf.Type.DATE_TIME);
  cols.push(this.created_at);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.updated_at = new lf.schema.BaseColumn(
      this, 'updated_at', false, true, lf.Type.DATE_TIME);
  cols.push(this.updated_at);

  var indices = [
    new lf.schema.Index('Users', 'pkUsers', true,
        [
          {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
        ])
  ];

  closeyourissues.db.schema.Users.base(
      this, 'constructor', 'Users', cols, indices, false);
};
goog.inherits(closeyourissues.db.schema.Users, lf.schema.Table);


/** @override */
closeyourissues.db.schema.Users.prototype.createRow = function(opt_value) {
  return new closeyourissues.db.row.Users(lf.Row.getNextId(), opt_value);
};


/** @override */
closeyourissues.db.schema.Users.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.created_at = goog.isNull(data.created_at) ?
      null : new Date(data.created_at);
  data.updated_at = goog.isNull(data.updated_at) ?
      null : new Date(data.updated_at);
  return new closeyourissues.db.row.Users(dbRecord['id'], data);
};


/** @override */
closeyourissues.db.schema.Users.prototype.getConstraint = function() {
  var pk = new lf.schema.Index('Users', 'pkUsers', true,
      [
        {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
      ]);
  var notNullable = [
    this.login,
    this.id,
    this.avatar_url,
    this.gravatar_id,
    this.url,
    this.html_url,
    this.followers_url,
    this.following_url,
    this.gists_url,
    this.starred_url,
    this.subscriptions_url,
    this.organizations_url,
    this.repos_url,
    this.events_url,
    this.received_events_url,
    this.type,
    this.site_admin,
    this.hireable,
    this.public_repos,
    this.public_gists,
    this.followers,
    this.following
  ];
  var foreignKeys = [];
  var unique = [
  ];
  return new lf.schema.Constraint(pk, notNullable, foreignKeys, unique);
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.UsersType = function() {
  /** @export @type {string} */
  this.login;
  /** @export @type {number} */
  this.id;
  /** @export @type {string} */
  this.avatar_url;
  /** @export @type {string} */
  this.gravatar_id;
  /** @export @type {string} */
  this.url;
  /** @export @type {string} */
  this.html_url;
  /** @export @type {string} */
  this.followers_url;
  /** @export @type {string} */
  this.following_url;
  /** @export @type {string} */
  this.gists_url;
  /** @export @type {string} */
  this.starred_url;
  /** @export @type {string} */
  this.subscriptions_url;
  /** @export @type {string} */
  this.organizations_url;
  /** @export @type {string} */
  this.repos_url;
  /** @export @type {string} */
  this.events_url;
  /** @export @type {string} */
  this.received_events_url;
  /** @export @type {string} */
  this.type;
  /** @export @type {boolean} */
  this.site_admin;
  /** @export @type {?string} */
  this.name;
  /** @export @type {?string} */
  this.company;
  /** @export @type {?string} */
  this.blog;
  /** @export @type {?string} */
  this.location;
  /** @export @type {?string} */
  this.email;
  /** @export @type {boolean} */
  this.hireable;
  /** @export @type {?string} */
  this.bio;
  /** @export @type {number} */
  this.public_repos;
  /** @export @type {number} */
  this.public_gists;
  /** @export @type {number} */
  this.followers;
  /** @export @type {number} */
  this.following;
  /** @export @type {?Date} */
  this.created_at;
  /** @export @type {?Date} */
  this.updated_at;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.UsersDbType = function() {
  /** @export @type {string} */
  this.login;
  /** @export @type {number} */
  this.id;
  /** @export @type {string} */
  this.avatar_url;
  /** @export @type {string} */
  this.gravatar_id;
  /** @export @type {string} */
  this.url;
  /** @export @type {string} */
  this.html_url;
  /** @export @type {string} */
  this.followers_url;
  /** @export @type {string} */
  this.following_url;
  /** @export @type {string} */
  this.gists_url;
  /** @export @type {string} */
  this.starred_url;
  /** @export @type {string} */
  this.subscriptions_url;
  /** @export @type {string} */
  this.organizations_url;
  /** @export @type {string} */
  this.repos_url;
  /** @export @type {string} */
  this.events_url;
  /** @export @type {string} */
  this.received_events_url;
  /** @export @type {string} */
  this.type;
  /** @export @type {boolean} */
  this.site_admin;
  /** @export @type {?string} */
  this.name;
  /** @export @type {?string} */
  this.company;
  /** @export @type {?string} */
  this.blog;
  /** @export @type {?string} */
  this.location;
  /** @export @type {?string} */
  this.email;
  /** @export @type {boolean} */
  this.hireable;
  /** @export @type {?string} */
  this.bio;
  /** @export @type {number} */
  this.public_repos;
  /** @export @type {number} */
  this.public_gists;
  /** @export @type {number} */
  this.followers;
  /** @export @type {number} */
  this.following;
  /** @export @type {?number} */
  this.created_at;
  /** @export @type {?number} */
  this.updated_at;
};



/**
 * Constructs a new Users row.
 * @constructor
 * @extends {lf.Row.<!closeyourissues.db.row.UsersType,
 *     !closeyourissues.db.row.UsersDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!closeyourissues.db.row.UsersType=} opt_payload
 */
closeyourissues.db.row.Users = function(rowId, opt_payload) {
  closeyourissues.db.row.Users.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(closeyourissues.db.row.Users, lf.Row);


/** @override */
closeyourissues.db.row.Users.prototype.defaultPayload = function() {
  var payload = new closeyourissues.db.row.UsersType();
  payload.login = '';
  payload.id = 0;
  payload.avatar_url = '';
  payload.gravatar_id = '';
  payload.url = '';
  payload.html_url = '';
  payload.followers_url = '';
  payload.following_url = '';
  payload.gists_url = '';
  payload.starred_url = '';
  payload.subscriptions_url = '';
  payload.organizations_url = '';
  payload.repos_url = '';
  payload.events_url = '';
  payload.received_events_url = '';
  payload.type = '';
  payload.site_admin = false;
  payload.name = null;
  payload.company = null;
  payload.blog = null;
  payload.location = null;
  payload.email = null;
  payload.hireable = false;
  payload.bio = null;
  payload.public_repos = 0;
  payload.public_gists = 0;
  payload.followers = 0;
  payload.following = 0;
  payload.created_at = null;
  payload.updated_at = null;
  return payload;
};


/** @override */
closeyourissues.db.row.Users.prototype.toDbPayload = function() {
  var payload = new closeyourissues.db.row.UsersDbType();
  payload.login = this.payload().login;
  payload.id = this.payload().id;
  payload.avatar_url = this.payload().avatar_url;
  payload.gravatar_id = this.payload().gravatar_id;
  payload.url = this.payload().url;
  payload.html_url = this.payload().html_url;
  payload.followers_url = this.payload().followers_url;
  payload.following_url = this.payload().following_url;
  payload.gists_url = this.payload().gists_url;
  payload.starred_url = this.payload().starred_url;
  payload.subscriptions_url = this.payload().subscriptions_url;
  payload.organizations_url = this.payload().organizations_url;
  payload.repos_url = this.payload().repos_url;
  payload.events_url = this.payload().events_url;
  payload.received_events_url = this.payload().received_events_url;
  payload.type = this.payload().type;
  payload.site_admin = this.payload().site_admin;
  payload.name = this.payload().name;
  payload.company = this.payload().company;
  payload.blog = this.payload().blog;
  payload.location = this.payload().location;
  payload.email = this.payload().email;
  payload.hireable = this.payload().hireable;
  payload.bio = this.payload().bio;
  payload.public_repos = this.payload().public_repos;
  payload.public_gists = this.payload().public_gists;
  payload.followers = this.payload().followers;
  payload.following = this.payload().following;
  payload.created_at = goog.isNull(this.payload().created_at) ?
      null : this.payload().created_at.getTime();
  payload.updated_at = goog.isNull(this.payload().updated_at) ?
      null : this.payload().updated_at.getTime();
  return payload;
};


/** @override */
closeyourissues.db.row.Users.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Users.pkUsers':
      return this.payload().id;
    case 'Users.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getLogin = function() {
  return this.payload().login;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setLogin = function(value) {
  this.payload().login = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Users.prototype.getId = function() {
  return this.payload().id;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setId = function(value) {
  this.payload().id = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getAvatar_url = function() {
  return this.payload().avatar_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setAvatar_url = function(value) {
  this.payload().avatar_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getGravatar_id = function() {
  return this.payload().gravatar_id;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setGravatar_id = function(value) {
  this.payload().gravatar_id = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getUrl = function() {
  return this.payload().url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setUrl = function(value) {
  this.payload().url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getHtml_url = function() {
  return this.payload().html_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setHtml_url = function(value) {
  this.payload().html_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getFollowers_url = function() {
  return this.payload().followers_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setFollowers_url = function(value) {
  this.payload().followers_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getFollowing_url = function() {
  return this.payload().following_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setFollowing_url = function(value) {
  this.payload().following_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getGists_url = function() {
  return this.payload().gists_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setGists_url = function(value) {
  this.payload().gists_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getStarred_url = function() {
  return this.payload().starred_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setStarred_url = function(value) {
  this.payload().starred_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getSubscriptions_url = function() {
  return this.payload().subscriptions_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setSubscriptions_url = function(value) {
  this.payload().subscriptions_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getOrganizations_url = function() {
  return this.payload().organizations_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setOrganizations_url = function(value) {
  this.payload().organizations_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getRepos_url = function() {
  return this.payload().repos_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setRepos_url = function(value) {
  this.payload().repos_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getEvents_url = function() {
  return this.payload().events_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setEvents_url = function(value) {
  this.payload().events_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getReceived_events_url = function() {
  return this.payload().received_events_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setReceived_events_url = function(value) {
  this.payload().received_events_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Users.prototype.getType = function() {
  return this.payload().type;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setType = function(value) {
  this.payload().type = value;
  return this;
};


/** @return {boolean} */
closeyourissues.db.row.Users.prototype.getSite_admin = function() {
  return this.payload().site_admin;
};


/**
 * @param {boolean} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setSite_admin = function(value) {
  this.payload().site_admin = value;
  return this;
};


/** @return {?string} */
closeyourissues.db.row.Users.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {?string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {?string} */
closeyourissues.db.row.Users.prototype.getCompany = function() {
  return this.payload().company;
};


/**
 * @param {?string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setCompany = function(value) {
  this.payload().company = value;
  return this;
};


/** @return {?string} */
closeyourissues.db.row.Users.prototype.getBlog = function() {
  return this.payload().blog;
};


/**
 * @param {?string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setBlog = function(value) {
  this.payload().blog = value;
  return this;
};


/** @return {?string} */
closeyourissues.db.row.Users.prototype.getLocation = function() {
  return this.payload().location;
};


/**
 * @param {?string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setLocation = function(value) {
  this.payload().location = value;
  return this;
};


/** @return {?string} */
closeyourissues.db.row.Users.prototype.getEmail = function() {
  return this.payload().email;
};


/**
 * @param {?string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setEmail = function(value) {
  this.payload().email = value;
  return this;
};


/** @return {boolean} */
closeyourissues.db.row.Users.prototype.getHireable = function() {
  return this.payload().hireable;
};


/**
 * @param {boolean} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setHireable = function(value) {
  this.payload().hireable = value;
  return this;
};


/** @return {?string} */
closeyourissues.db.row.Users.prototype.getBio = function() {
  return this.payload().bio;
};


/**
 * @param {?string} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setBio = function(value) {
  this.payload().bio = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Users.prototype.getPublic_repos = function() {
  return this.payload().public_repos;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setPublic_repos = function(value) {
  this.payload().public_repos = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Users.prototype.getPublic_gists = function() {
  return this.payload().public_gists;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setPublic_gists = function(value) {
  this.payload().public_gists = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Users.prototype.getFollowers = function() {
  return this.payload().followers;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setFollowers = function(value) {
  this.payload().followers = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Users.prototype.getFollowing = function() {
  return this.payload().following;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setFollowing = function(value) {
  this.payload().following = value;
  return this;
};


/** @return {?Date} */
closeyourissues.db.row.Users.prototype.getCreated_at = function() {
  return this.payload().created_at;
};


/**
 * @param {?Date} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setCreated_at = function(value) {
  this.payload().created_at = value;
  return this;
};


/** @return {?Date} */
closeyourissues.db.row.Users.prototype.getUpdated_at = function() {
  return this.payload().updated_at;
};


/**
 * @param {?Date} value
 * @return {!closeyourissues.db.row.Users}
*/
closeyourissues.db.row.Users.prototype.setUpdated_at = function(value) {
  this.payload().updated_at = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!closeyourissues.db.row.MilestonesType,
 *     !closeyourissues.db.row.MilestonesDbType>}
 * @constructor
 */
closeyourissues.db.schema.Milestones = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.url = new lf.schema.BaseColumn(
      this, 'url', false, false, lf.Type.STRING);
  cols.push(this.url);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.number = new lf.schema.BaseColumn(
      this, 'number', true, false, lf.Type.INTEGER);
  cols.push(this.number);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.state = new lf.schema.BaseColumn(
      this, 'state', false, false, lf.Type.STRING);
  cols.push(this.state);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.title = new lf.schema.BaseColumn(
      this, 'title', false, false, lf.Type.STRING);
  cols.push(this.title);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.description = new lf.schema.BaseColumn(
      this, 'description', false, false, lf.Type.STRING);
  cols.push(this.description);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.creator = new lf.schema.BaseColumn(
      this, 'creator', false, false, lf.Type.INTEGER);
  cols.push(this.creator);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.open_issues = new lf.schema.BaseColumn(
      this, 'open_issues', false, false, lf.Type.INTEGER);
  cols.push(this.open_issues);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.closed_issues = new lf.schema.BaseColumn(
      this, 'closed_issues', false, false, lf.Type.INTEGER);
  cols.push(this.closed_issues);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.created_at = new lf.schema.BaseColumn(
      this, 'created_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.created_at);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.updated_at = new lf.schema.BaseColumn(
      this, 'updated_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.updated_at);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.closed_at = new lf.schema.BaseColumn(
      this, 'closed_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.closed_at);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.due_on = new lf.schema.BaseColumn(
      this, 'due_on', false, true, lf.Type.DATE_TIME);
  cols.push(this.due_on);

  var indices = [
    new lf.schema.Index('Milestones', 'pkMilestones', true,
        [
          {schema: this.number, order: lf.Order.ASC, autoIncrement: false}
        ])
  ];

  closeyourissues.db.schema.Milestones.base(
      this, 'constructor', 'Milestones', cols, indices, false);
};
goog.inherits(closeyourissues.db.schema.Milestones, lf.schema.Table);


/** @override */
closeyourissues.db.schema.Milestones.prototype.createRow = function(opt_value) {
  return new closeyourissues.db.row.Milestones(lf.Row.getNextId(), opt_value);
};


/** @override */
closeyourissues.db.schema.Milestones.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.created_at = new Date(data.created_at);
  data.updated_at = new Date(data.updated_at);
  data.closed_at = new Date(data.closed_at);
  data.due_on = goog.isNull(data.due_on) ?
      null : new Date(data.due_on);
  return new closeyourissues.db.row.Milestones(dbRecord['id'], data);
};


/** @override */
closeyourissues.db.schema.Milestones.prototype.getConstraint = function() {
  var pk = new lf.schema.Index('Milestones', 'pkMilestones', true,
      [
        {schema: this.number, order: lf.Order.ASC, autoIncrement: false}
      ]);
  var notNullable = [
    this.url,
    this.number,
    this.state,
    this.title,
    this.description,
    this.creator,
    this.open_issues,
    this.closed_issues,
    this.created_at,
    this.updated_at,
    this.closed_at
  ];
  var foreignKeys = [];
  var unique = [
  ];
  return new lf.schema.Constraint(pk, notNullable, foreignKeys, unique);
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.MilestonesType = function() {
  /** @export @type {string} */
  this.url;
  /** @export @type {number} */
  this.number;
  /** @export @type {string} */
  this.state;
  /** @export @type {string} */
  this.title;
  /** @export @type {string} */
  this.description;
  /** @export @type {number} */
  this.creator;
  /** @export @type {number} */
  this.open_issues;
  /** @export @type {number} */
  this.closed_issues;
  /** @export @type {!Date} */
  this.created_at;
  /** @export @type {!Date} */
  this.updated_at;
  /** @export @type {!Date} */
  this.closed_at;
  /** @export @type {?Date} */
  this.due_on;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.MilestonesDbType = function() {
  /** @export @type {string} */
  this.url;
  /** @export @type {number} */
  this.number;
  /** @export @type {string} */
  this.state;
  /** @export @type {string} */
  this.title;
  /** @export @type {string} */
  this.description;
  /** @export @type {number} */
  this.creator;
  /** @export @type {number} */
  this.open_issues;
  /** @export @type {number} */
  this.closed_issues;
  /** @export @type {number} */
  this.created_at;
  /** @export @type {number} */
  this.updated_at;
  /** @export @type {number} */
  this.closed_at;
  /** @export @type {?number} */
  this.due_on;
};



/**
 * Constructs a new Milestones row.
 * @constructor
 * @extends {lf.Row.<!closeyourissues.db.row.MilestonesType,
 *     !closeyourissues.db.row.MilestonesDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!closeyourissues.db.row.MilestonesType=} opt_payload
 */
closeyourissues.db.row.Milestones = function(rowId, opt_payload) {
  closeyourissues.db.row.Milestones.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(closeyourissues.db.row.Milestones, lf.Row);


/** @override */
closeyourissues.db.row.Milestones.prototype.defaultPayload = function() {
  var payload = new closeyourissues.db.row.MilestonesType();
  payload.url = '';
  payload.number = 0;
  payload.state = '';
  payload.title = '';
  payload.description = '';
  payload.creator = 0;
  payload.open_issues = 0;
  payload.closed_issues = 0;
  payload.created_at = new Date(0);
  payload.updated_at = new Date(0);
  payload.closed_at = new Date(0);
  payload.due_on = null;
  return payload;
};


/** @override */
closeyourissues.db.row.Milestones.prototype.toDbPayload = function() {
  var payload = new closeyourissues.db.row.MilestonesDbType();
  payload.url = this.payload().url;
  payload.number = this.payload().number;
  payload.state = this.payload().state;
  payload.title = this.payload().title;
  payload.description = this.payload().description;
  payload.creator = this.payload().creator;
  payload.open_issues = this.payload().open_issues;
  payload.closed_issues = this.payload().closed_issues;
  payload.created_at = this.payload().created_at.getTime();
  payload.updated_at = this.payload().updated_at.getTime();
  payload.closed_at = this.payload().closed_at.getTime();
  payload.due_on = goog.isNull(this.payload().due_on) ?
      null : this.payload().due_on.getTime();
  return payload;
};


/** @override */
closeyourissues.db.row.Milestones.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Milestones.pkMilestones':
      return this.payload().number;
    case 'Milestones.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
closeyourissues.db.row.Milestones.prototype.getUrl = function() {
  return this.payload().url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setUrl = function(value) {
  this.payload().url = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Milestones.prototype.getNumber = function() {
  return this.payload().number;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setNumber = function(value) {
  this.payload().number = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Milestones.prototype.getState = function() {
  return this.payload().state;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setState = function(value) {
  this.payload().state = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Milestones.prototype.getTitle = function() {
  return this.payload().title;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setTitle = function(value) {
  this.payload().title = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Milestones.prototype.getDescription = function() {
  return this.payload().description;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setDescription = function(value) {
  this.payload().description = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Milestones.prototype.getCreator = function() {
  return this.payload().creator;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setCreator = function(value) {
  this.payload().creator = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Milestones.prototype.getOpen_issues = function() {
  return this.payload().open_issues;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setOpen_issues = function(value) {
  this.payload().open_issues = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Milestones.prototype.getClosed_issues = function() {
  return this.payload().closed_issues;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setClosed_issues = function(value) {
  this.payload().closed_issues = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.Milestones.prototype.getCreated_at = function() {
  return this.payload().created_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setCreated_at = function(value) {
  this.payload().created_at = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.Milestones.prototype.getUpdated_at = function() {
  return this.payload().updated_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setUpdated_at = function(value) {
  this.payload().updated_at = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.Milestones.prototype.getClosed_at = function() {
  return this.payload().closed_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setClosed_at = function(value) {
  this.payload().closed_at = value;
  return this;
};


/** @return {?Date} */
closeyourissues.db.row.Milestones.prototype.getDue_on = function() {
  return this.payload().due_on;
};


/**
 * @param {?Date} value
 * @return {!closeyourissues.db.row.Milestones}
*/
closeyourissues.db.row.Milestones.prototype.setDue_on = function(value) {
  this.payload().due_on = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!closeyourissues.db.row.PullRequestsType,
 *     !closeyourissues.db.row.PullRequestsDbType>}
 * @constructor
 */
closeyourissues.db.schema.PullRequests = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.id = new lf.schema.BaseColumn(
      this, 'id', true, false, lf.Type.INTEGER);
  cols.push(this.id);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.url = new lf.schema.BaseColumn(
      this, 'url', false, false, lf.Type.STRING);
  cols.push(this.url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.html_url = new lf.schema.BaseColumn(
      this, 'html_url', false, false, lf.Type.STRING);
  cols.push(this.html_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.diff_url = new lf.schema.BaseColumn(
      this, 'diff_url', false, false, lf.Type.STRING);
  cols.push(this.diff_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.patch_url = new lf.schema.BaseColumn(
      this, 'patch_url', false, false, lf.Type.STRING);
  cols.push(this.patch_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.issue_url = new lf.schema.BaseColumn(
      this, 'issue_url', false, false, lf.Type.STRING);
  cols.push(this.issue_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.commits_url = new lf.schema.BaseColumn(
      this, 'commits_url', false, false, lf.Type.STRING);
  cols.push(this.commits_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.review_comments_url = new lf.schema.BaseColumn(
      this, 'review_comments_url', false, false, lf.Type.STRING);
  cols.push(this.review_comments_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.review_comment_url = new lf.schema.BaseColumn(
      this, 'review_comment_url', false, false, lf.Type.STRING);
  cols.push(this.review_comment_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.comments_url = new lf.schema.BaseColumn(
      this, 'comments_url', false, false, lf.Type.STRING);
  cols.push(this.comments_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.statuses_url = new lf.schema.BaseColumn(
      this, 'statuses_url', false, false, lf.Type.STRING);
  cols.push(this.statuses_url);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.number = new lf.schema.BaseColumn(
      this, 'number', false, false, lf.Type.INTEGER);
  cols.push(this.number);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.state = new lf.schema.BaseColumn(
      this, 'state', false, false, lf.Type.STRING);
  cols.push(this.state);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.title = new lf.schema.BaseColumn(
      this, 'title', false, false, lf.Type.STRING);
  cols.push(this.title);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.body = new lf.schema.BaseColumn(
      this, 'body', false, false, lf.Type.STRING);
  cols.push(this.body);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.created_at = new lf.schema.BaseColumn(
      this, 'created_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.created_at);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.updated_at = new lf.schema.BaseColumn(
      this, 'updated_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.updated_at);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.closed_at = new lf.schema.BaseColumn(
      this, 'closed_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.closed_at);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.merged_at = new lf.schema.BaseColumn(
      this, 'merged_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.merged_at);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.head = new lf.schema.BaseColumn(
      this, 'head', false, false, lf.Type.STRING);
  cols.push(this.head);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.base = new lf.schema.BaseColumn(
      this, 'base', false, false, lf.Type.STRING);
  cols.push(this.base);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.user = new lf.schema.BaseColumn(
      this, 'user', false, false, lf.Type.INTEGER);
  cols.push(this.user);

  var indices = [
    new lf.schema.Index('PullRequests', 'pkPullRequests', true,
        [
          {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
        ])
  ];

  closeyourissues.db.schema.PullRequests.base(
      this, 'constructor', 'PullRequests', cols, indices, false);
};
goog.inherits(closeyourissues.db.schema.PullRequests, lf.schema.Table);


/** @override */
closeyourissues.db.schema.PullRequests.prototype.createRow = function(opt_value) {
  return new closeyourissues.db.row.PullRequests(lf.Row.getNextId(), opt_value);
};


/** @override */
closeyourissues.db.schema.PullRequests.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.created_at = new Date(data.created_at);
  data.updated_at = new Date(data.updated_at);
  data.closed_at = new Date(data.closed_at);
  data.merged_at = new Date(data.merged_at);
  return new closeyourissues.db.row.PullRequests(dbRecord['id'], data);
};


/** @override */
closeyourissues.db.schema.PullRequests.prototype.getConstraint = function() {
  var pk = new lf.schema.Index('PullRequests', 'pkPullRequests', true,
      [
        {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
      ]);
  var notNullable = [
    this.id,
    this.url,
    this.html_url,
    this.diff_url,
    this.patch_url,
    this.issue_url,
    this.commits_url,
    this.review_comments_url,
    this.review_comment_url,
    this.comments_url,
    this.statuses_url,
    this.number,
    this.state,
    this.title,
    this.body,
    this.created_at,
    this.updated_at,
    this.closed_at,
    this.merged_at,
    this.head,
    this.base,
    this.user
  ];
  var foreignKeys = [];
  var unique = [
  ];
  return new lf.schema.Constraint(pk, notNullable, foreignKeys, unique);
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.PullRequestsType = function() {
  /** @export @type {number} */
  this.id;
  /** @export @type {string} */
  this.url;
  /** @export @type {string} */
  this.html_url;
  /** @export @type {string} */
  this.diff_url;
  /** @export @type {string} */
  this.patch_url;
  /** @export @type {string} */
  this.issue_url;
  /** @export @type {string} */
  this.commits_url;
  /** @export @type {string} */
  this.review_comments_url;
  /** @export @type {string} */
  this.review_comment_url;
  /** @export @type {string} */
  this.comments_url;
  /** @export @type {string} */
  this.statuses_url;
  /** @export @type {number} */
  this.number;
  /** @export @type {string} */
  this.state;
  /** @export @type {string} */
  this.title;
  /** @export @type {string} */
  this.body;
  /** @export @type {!Date} */
  this.created_at;
  /** @export @type {!Date} */
  this.updated_at;
  /** @export @type {!Date} */
  this.closed_at;
  /** @export @type {!Date} */
  this.merged_at;
  /** @export @type {string} */
  this.head;
  /** @export @type {string} */
  this.base;
  /** @export @type {number} */
  this.user;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.PullRequestsDbType = function() {
  /** @export @type {number} */
  this.id;
  /** @export @type {string} */
  this.url;
  /** @export @type {string} */
  this.html_url;
  /** @export @type {string} */
  this.diff_url;
  /** @export @type {string} */
  this.patch_url;
  /** @export @type {string} */
  this.issue_url;
  /** @export @type {string} */
  this.commits_url;
  /** @export @type {string} */
  this.review_comments_url;
  /** @export @type {string} */
  this.review_comment_url;
  /** @export @type {string} */
  this.comments_url;
  /** @export @type {string} */
  this.statuses_url;
  /** @export @type {number} */
  this.number;
  /** @export @type {string} */
  this.state;
  /** @export @type {string} */
  this.title;
  /** @export @type {string} */
  this.body;
  /** @export @type {number} */
  this.created_at;
  /** @export @type {number} */
  this.updated_at;
  /** @export @type {number} */
  this.closed_at;
  /** @export @type {number} */
  this.merged_at;
  /** @export @type {string} */
  this.head;
  /** @export @type {string} */
  this.base;
  /** @export @type {number} */
  this.user;
};



/**
 * Constructs a new PullRequests row.
 * @constructor
 * @extends {lf.Row.<!closeyourissues.db.row.PullRequestsType,
 *     !closeyourissues.db.row.PullRequestsDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!closeyourissues.db.row.PullRequestsType=} opt_payload
 */
closeyourissues.db.row.PullRequests = function(rowId, opt_payload) {
  closeyourissues.db.row.PullRequests.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(closeyourissues.db.row.PullRequests, lf.Row);


/** @override */
closeyourissues.db.row.PullRequests.prototype.defaultPayload = function() {
  var payload = new closeyourissues.db.row.PullRequestsType();
  payload.id = 0;
  payload.url = '';
  payload.html_url = '';
  payload.diff_url = '';
  payload.patch_url = '';
  payload.issue_url = '';
  payload.commits_url = '';
  payload.review_comments_url = '';
  payload.review_comment_url = '';
  payload.comments_url = '';
  payload.statuses_url = '';
  payload.number = 0;
  payload.state = '';
  payload.title = '';
  payload.body = '';
  payload.created_at = new Date(0);
  payload.updated_at = new Date(0);
  payload.closed_at = new Date(0);
  payload.merged_at = new Date(0);
  payload.head = '';
  payload.base = '';
  payload.user = 0;
  return payload;
};


/** @override */
closeyourissues.db.row.PullRequests.prototype.toDbPayload = function() {
  var payload = new closeyourissues.db.row.PullRequestsDbType();
  payload.id = this.payload().id;
  payload.url = this.payload().url;
  payload.html_url = this.payload().html_url;
  payload.diff_url = this.payload().diff_url;
  payload.patch_url = this.payload().patch_url;
  payload.issue_url = this.payload().issue_url;
  payload.commits_url = this.payload().commits_url;
  payload.review_comments_url = this.payload().review_comments_url;
  payload.review_comment_url = this.payload().review_comment_url;
  payload.comments_url = this.payload().comments_url;
  payload.statuses_url = this.payload().statuses_url;
  payload.number = this.payload().number;
  payload.state = this.payload().state;
  payload.title = this.payload().title;
  payload.body = this.payload().body;
  payload.created_at = this.payload().created_at.getTime();
  payload.updated_at = this.payload().updated_at.getTime();
  payload.closed_at = this.payload().closed_at.getTime();
  payload.merged_at = this.payload().merged_at.getTime();
  payload.head = this.payload().head;
  payload.base = this.payload().base;
  payload.user = this.payload().user;
  return payload;
};


/** @override */
closeyourissues.db.row.PullRequests.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'PullRequests.pkPullRequests':
      return this.payload().id;
    case 'PullRequests.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {number} */
closeyourissues.db.row.PullRequests.prototype.getId = function() {
  return this.payload().id;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setId = function(value) {
  this.payload().id = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getUrl = function() {
  return this.payload().url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setUrl = function(value) {
  this.payload().url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getHtml_url = function() {
  return this.payload().html_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setHtml_url = function(value) {
  this.payload().html_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getDiff_url = function() {
  return this.payload().diff_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setDiff_url = function(value) {
  this.payload().diff_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getPatch_url = function() {
  return this.payload().patch_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setPatch_url = function(value) {
  this.payload().patch_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getIssue_url = function() {
  return this.payload().issue_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setIssue_url = function(value) {
  this.payload().issue_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getCommits_url = function() {
  return this.payload().commits_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setCommits_url = function(value) {
  this.payload().commits_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getReview_comments_url = function() {
  return this.payload().review_comments_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setReview_comments_url = function(value) {
  this.payload().review_comments_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getReview_comment_url = function() {
  return this.payload().review_comment_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setReview_comment_url = function(value) {
  this.payload().review_comment_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getComments_url = function() {
  return this.payload().comments_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setComments_url = function(value) {
  this.payload().comments_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getStatuses_url = function() {
  return this.payload().statuses_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setStatuses_url = function(value) {
  this.payload().statuses_url = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.PullRequests.prototype.getNumber = function() {
  return this.payload().number;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setNumber = function(value) {
  this.payload().number = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getState = function() {
  return this.payload().state;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setState = function(value) {
  this.payload().state = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getTitle = function() {
  return this.payload().title;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setTitle = function(value) {
  this.payload().title = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getBody = function() {
  return this.payload().body;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setBody = function(value) {
  this.payload().body = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.PullRequests.prototype.getCreated_at = function() {
  return this.payload().created_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setCreated_at = function(value) {
  this.payload().created_at = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.PullRequests.prototype.getUpdated_at = function() {
  return this.payload().updated_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setUpdated_at = function(value) {
  this.payload().updated_at = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.PullRequests.prototype.getClosed_at = function() {
  return this.payload().closed_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setClosed_at = function(value) {
  this.payload().closed_at = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.PullRequests.prototype.getMerged_at = function() {
  return this.payload().merged_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setMerged_at = function(value) {
  this.payload().merged_at = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getHead = function() {
  return this.payload().head;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setHead = function(value) {
  this.payload().head = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.PullRequests.prototype.getBase = function() {
  return this.payload().base;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setBase = function(value) {
  this.payload().base = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.PullRequests.prototype.getUser = function() {
  return this.payload().user;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.PullRequests}
*/
closeyourissues.db.row.PullRequests.prototype.setUser = function(value) {
  this.payload().user = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!closeyourissues.db.row.CommitsType,
 *     !closeyourissues.db.row.CommitsDbType>}
 * @constructor
 */
closeyourissues.db.schema.Commits = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.sha = new lf.schema.BaseColumn(
      this, 'sha', true, false, lf.Type.STRING);
  cols.push(this.sha);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.url = new lf.schema.BaseColumn(
      this, 'url', false, false, lf.Type.STRING);
  cols.push(this.url);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.author = new lf.schema.BaseColumn(
      this, 'author', false, false, lf.Type.INTEGER);
  cols.push(this.author);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.committer = new lf.schema.BaseColumn(
      this, 'committer', false, false, lf.Type.INTEGER);
  cols.push(this.committer);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.message = new lf.schema.BaseColumn(
      this, 'message', false, false, lf.Type.STRING);
  cols.push(this.message);

  var indices = [
    new lf.schema.Index('Commits', 'pkCommits', true,
        [
          {schema: this.sha, order: lf.Order.ASC, autoIncrement: false}
        ])
  ];

  closeyourissues.db.schema.Commits.base(
      this, 'constructor', 'Commits', cols, indices, false);
};
goog.inherits(closeyourissues.db.schema.Commits, lf.schema.Table);


/** @override */
closeyourissues.db.schema.Commits.prototype.createRow = function(opt_value) {
  return new closeyourissues.db.row.Commits(lf.Row.getNextId(), opt_value);
};


/** @override */
closeyourissues.db.schema.Commits.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  return new closeyourissues.db.row.Commits(dbRecord['id'], data);
};


/** @override */
closeyourissues.db.schema.Commits.prototype.getConstraint = function() {
  var pk = new lf.schema.Index('Commits', 'pkCommits', true,
      [
        {schema: this.sha, order: lf.Order.ASC, autoIncrement: false}
      ]);
  var notNullable = [
    this.sha,
    this.url,
    this.author,
    this.committer,
    this.message
  ];
  var foreignKeys = [];
  var unique = [
  ];
  return new lf.schema.Constraint(pk, notNullable, foreignKeys, unique);
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.CommitsType = function() {
  /** @export @type {string} */
  this.sha;
  /** @export @type {string} */
  this.url;
  /** @export @type {number} */
  this.author;
  /** @export @type {number} */
  this.committer;
  /** @export @type {string} */
  this.message;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.CommitsDbType = function() {
  /** @export @type {string} */
  this.sha;
  /** @export @type {string} */
  this.url;
  /** @export @type {number} */
  this.author;
  /** @export @type {number} */
  this.committer;
  /** @export @type {string} */
  this.message;
};



/**
 * Constructs a new Commits row.
 * @constructor
 * @extends {lf.Row.<!closeyourissues.db.row.CommitsType,
 *     !closeyourissues.db.row.CommitsDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!closeyourissues.db.row.CommitsType=} opt_payload
 */
closeyourissues.db.row.Commits = function(rowId, opt_payload) {
  closeyourissues.db.row.Commits.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(closeyourissues.db.row.Commits, lf.Row);


/** @override */
closeyourissues.db.row.Commits.prototype.defaultPayload = function() {
  var payload = new closeyourissues.db.row.CommitsType();
  payload.sha = '';
  payload.url = '';
  payload.author = 0;
  payload.committer = 0;
  payload.message = '';
  return payload;
};


/** @override */
closeyourissues.db.row.Commits.prototype.toDbPayload = function() {
  var payload = new closeyourissues.db.row.CommitsDbType();
  payload.sha = this.payload().sha;
  payload.url = this.payload().url;
  payload.author = this.payload().author;
  payload.committer = this.payload().committer;
  payload.message = this.payload().message;
  return payload;
};


/** @override */
closeyourissues.db.row.Commits.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Commits.pkCommits':
      return this.payload().sha;
    case 'Commits.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {string} */
closeyourissues.db.row.Commits.prototype.getSha = function() {
  return this.payload().sha;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Commits}
*/
closeyourissues.db.row.Commits.prototype.setSha = function(value) {
  this.payload().sha = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Commits.prototype.getUrl = function() {
  return this.payload().url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Commits}
*/
closeyourissues.db.row.Commits.prototype.setUrl = function(value) {
  this.payload().url = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Commits.prototype.getAuthor = function() {
  return this.payload().author;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Commits}
*/
closeyourissues.db.row.Commits.prototype.setAuthor = function(value) {
  this.payload().author = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Commits.prototype.getCommitter = function() {
  return this.payload().committer;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Commits}
*/
closeyourissues.db.row.Commits.prototype.setCommitter = function(value) {
  this.payload().committer = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Commits.prototype.getMessage = function() {
  return this.payload().message;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Commits}
*/
closeyourissues.db.row.Commits.prototype.setMessage = function(value) {
  this.payload().message = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!closeyourissues.db.row.OrganizationsType,
 *     !closeyourissues.db.row.OrganizationsDbType>}
 * @constructor
 */
closeyourissues.db.schema.Organizations = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.id = new lf.schema.BaseColumn(
      this, 'id', true, false, lf.Type.INTEGER);
  cols.push(this.id);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.login = new lf.schema.BaseColumn(
      this, 'login', false, false, lf.Type.STRING);
  cols.push(this.login);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.url = new lf.schema.BaseColumn(
      this, 'url', false, false, lf.Type.STRING);
  cols.push(this.url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.avatar_url = new lf.schema.BaseColumn(
      this, 'avatar_url', false, true, lf.Type.STRING);
  cols.push(this.avatar_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.description = new lf.schema.BaseColumn(
      this, 'description', false, true, lf.Type.STRING);
  cols.push(this.description);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', false, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.company = new lf.schema.BaseColumn(
      this, 'company', false, false, lf.Type.STRING);
  cols.push(this.company);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.blog = new lf.schema.BaseColumn(
      this, 'blog', false, false, lf.Type.STRING);
  cols.push(this.blog);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.location = new lf.schema.BaseColumn(
      this, 'location', false, false, lf.Type.STRING);
  cols.push(this.location);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.email = new lf.schema.BaseColumn(
      this, 'email', false, false, lf.Type.STRING);
  cols.push(this.email);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.public_repos = new lf.schema.BaseColumn(
      this, 'public_repos', false, false, lf.Type.INTEGER);
  cols.push(this.public_repos);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.public_gists = new lf.schema.BaseColumn(
      this, 'public_gists', false, false, lf.Type.INTEGER);
  cols.push(this.public_gists);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.followers = new lf.schema.BaseColumn(
      this, 'followers', false, false, lf.Type.INTEGER);
  cols.push(this.followers);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.following = new lf.schema.BaseColumn(
      this, 'following', false, false, lf.Type.INTEGER);
  cols.push(this.following);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.html_url = new lf.schema.BaseColumn(
      this, 'html_url', false, false, lf.Type.STRING);
  cols.push(this.html_url);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.created_at = new lf.schema.BaseColumn(
      this, 'created_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.created_at);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.type = new lf.schema.BaseColumn(
      this, 'type', false, false, lf.Type.STRING);
  cols.push(this.type);

  var indices = [
    new lf.schema.Index('Organizations', 'pkOrganizations', true,
        [
          {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
        ])
  ];

  closeyourissues.db.schema.Organizations.base(
      this, 'constructor', 'Organizations', cols, indices, false);
};
goog.inherits(closeyourissues.db.schema.Organizations, lf.schema.Table);


/** @override */
closeyourissues.db.schema.Organizations.prototype.createRow = function(opt_value) {
  return new closeyourissues.db.row.Organizations(lf.Row.getNextId(), opt_value);
};


/** @override */
closeyourissues.db.schema.Organizations.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.created_at = new Date(data.created_at);
  return new closeyourissues.db.row.Organizations(dbRecord['id'], data);
};


/** @override */
closeyourissues.db.schema.Organizations.prototype.getConstraint = function() {
  var pk = new lf.schema.Index('Organizations', 'pkOrganizations', true,
      [
        {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
      ]);
  var notNullable = [
    this.id,
    this.login,
    this.url,
    this.name,
    this.company,
    this.blog,
    this.location,
    this.email,
    this.public_repos,
    this.public_gists,
    this.followers,
    this.following,
    this.html_url,
    this.created_at,
    this.type
  ];
  var foreignKeys = [];
  var unique = [
  ];
  return new lf.schema.Constraint(pk, notNullable, foreignKeys, unique);
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.OrganizationsType = function() {
  /** @export @type {number} */
  this.id;
  /** @export @type {string} */
  this.login;
  /** @export @type {string} */
  this.url;
  /** @export @type {?string} */
  this.avatar_url;
  /** @export @type {?string} */
  this.description;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.company;
  /** @export @type {string} */
  this.blog;
  /** @export @type {string} */
  this.location;
  /** @export @type {string} */
  this.email;
  /** @export @type {number} */
  this.public_repos;
  /** @export @type {number} */
  this.public_gists;
  /** @export @type {number} */
  this.followers;
  /** @export @type {number} */
  this.following;
  /** @export @type {string} */
  this.html_url;
  /** @export @type {!Date} */
  this.created_at;
  /** @export @type {string} */
  this.type;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.OrganizationsDbType = function() {
  /** @export @type {number} */
  this.id;
  /** @export @type {string} */
  this.login;
  /** @export @type {string} */
  this.url;
  /** @export @type {?string} */
  this.avatar_url;
  /** @export @type {?string} */
  this.description;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.company;
  /** @export @type {string} */
  this.blog;
  /** @export @type {string} */
  this.location;
  /** @export @type {string} */
  this.email;
  /** @export @type {number} */
  this.public_repos;
  /** @export @type {number} */
  this.public_gists;
  /** @export @type {number} */
  this.followers;
  /** @export @type {number} */
  this.following;
  /** @export @type {string} */
  this.html_url;
  /** @export @type {number} */
  this.created_at;
  /** @export @type {string} */
  this.type;
};



/**
 * Constructs a new Organizations row.
 * @constructor
 * @extends {lf.Row.<!closeyourissues.db.row.OrganizationsType,
 *     !closeyourissues.db.row.OrganizationsDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!closeyourissues.db.row.OrganizationsType=} opt_payload
 */
closeyourissues.db.row.Organizations = function(rowId, opt_payload) {
  closeyourissues.db.row.Organizations.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(closeyourissues.db.row.Organizations, lf.Row);


/** @override */
closeyourissues.db.row.Organizations.prototype.defaultPayload = function() {
  var payload = new closeyourissues.db.row.OrganizationsType();
  payload.id = 0;
  payload.login = '';
  payload.url = '';
  payload.avatar_url = null;
  payload.description = null;
  payload.name = '';
  payload.company = '';
  payload.blog = '';
  payload.location = '';
  payload.email = '';
  payload.public_repos = 0;
  payload.public_gists = 0;
  payload.followers = 0;
  payload.following = 0;
  payload.html_url = '';
  payload.created_at = new Date(0);
  payload.type = '';
  return payload;
};


/** @override */
closeyourissues.db.row.Organizations.prototype.toDbPayload = function() {
  var payload = new closeyourissues.db.row.OrganizationsDbType();
  payload.id = this.payload().id;
  payload.login = this.payload().login;
  payload.url = this.payload().url;
  payload.avatar_url = this.payload().avatar_url;
  payload.description = this.payload().description;
  payload.name = this.payload().name;
  payload.company = this.payload().company;
  payload.blog = this.payload().blog;
  payload.location = this.payload().location;
  payload.email = this.payload().email;
  payload.public_repos = this.payload().public_repos;
  payload.public_gists = this.payload().public_gists;
  payload.followers = this.payload().followers;
  payload.following = this.payload().following;
  payload.html_url = this.payload().html_url;
  payload.created_at = this.payload().created_at.getTime();
  payload.type = this.payload().type;
  return payload;
};


/** @override */
closeyourissues.db.row.Organizations.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Organizations.pkOrganizations':
      return this.payload().id;
    case 'Organizations.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {number} */
closeyourissues.db.row.Organizations.prototype.getId = function() {
  return this.payload().id;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setId = function(value) {
  this.payload().id = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Organizations.prototype.getLogin = function() {
  return this.payload().login;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setLogin = function(value) {
  this.payload().login = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Organizations.prototype.getUrl = function() {
  return this.payload().url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setUrl = function(value) {
  this.payload().url = value;
  return this;
};


/** @return {?string} */
closeyourissues.db.row.Organizations.prototype.getAvatar_url = function() {
  return this.payload().avatar_url;
};


/**
 * @param {?string} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setAvatar_url = function(value) {
  this.payload().avatar_url = value;
  return this;
};


/** @return {?string} */
closeyourissues.db.row.Organizations.prototype.getDescription = function() {
  return this.payload().description;
};


/**
 * @param {?string} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setDescription = function(value) {
  this.payload().description = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Organizations.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Organizations.prototype.getCompany = function() {
  return this.payload().company;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setCompany = function(value) {
  this.payload().company = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Organizations.prototype.getBlog = function() {
  return this.payload().blog;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setBlog = function(value) {
  this.payload().blog = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Organizations.prototype.getLocation = function() {
  return this.payload().location;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setLocation = function(value) {
  this.payload().location = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Organizations.prototype.getEmail = function() {
  return this.payload().email;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setEmail = function(value) {
  this.payload().email = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Organizations.prototype.getPublic_repos = function() {
  return this.payload().public_repos;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setPublic_repos = function(value) {
  this.payload().public_repos = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Organizations.prototype.getPublic_gists = function() {
  return this.payload().public_gists;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setPublic_gists = function(value) {
  this.payload().public_gists = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Organizations.prototype.getFollowers = function() {
  return this.payload().followers;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setFollowers = function(value) {
  this.payload().followers = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Organizations.prototype.getFollowing = function() {
  return this.payload().following;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setFollowing = function(value) {
  this.payload().following = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Organizations.prototype.getHtml_url = function() {
  return this.payload().html_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setHtml_url = function(value) {
  this.payload().html_url = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.Organizations.prototype.getCreated_at = function() {
  return this.payload().created_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setCreated_at = function(value) {
  this.payload().created_at = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Organizations.prototype.getType = function() {
  return this.payload().type;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Organizations}
*/
closeyourissues.db.row.Organizations.prototype.setType = function(value) {
  this.payload().type = value;
  return this;
};



/**
 * @extends {lf.schema.Table.<!closeyourissues.db.row.RepositoriesType,
 *     !closeyourissues.db.row.RepositoriesDbType>}
 * @constructor
 */
closeyourissues.db.schema.Repositories = function() {
  var cols = [];

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.id = new lf.schema.BaseColumn(
      this, 'id', true, false, lf.Type.INTEGER);
  cols.push(this.id);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.owner = new lf.schema.BaseColumn(
      this, 'owner', false, false, lf.Type.INTEGER);
  cols.push(this.owner);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.name = new lf.schema.BaseColumn(
      this, 'name', false, false, lf.Type.STRING);
  cols.push(this.name);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.full_name = new lf.schema.BaseColumn(
      this, 'full_name', false, false, lf.Type.STRING);
  cols.push(this.full_name);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.description = new lf.schema.BaseColumn(
      this, 'description', false, false, lf.Type.STRING);
  cols.push(this.description);

  /** @type {!lf.schema.BaseColumn.<boolean>} */
  this.private = new lf.schema.BaseColumn(
      this, 'private', false, false, lf.Type.BOOLEAN);
  cols.push(this.private);

  /** @type {!lf.schema.BaseColumn.<boolean>} */
  this.fork = new lf.schema.BaseColumn(
      this, 'fork', false, false, lf.Type.BOOLEAN);
  cols.push(this.fork);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.url = new lf.schema.BaseColumn(
      this, 'url', false, false, lf.Type.STRING);
  cols.push(this.url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.html_url = new lf.schema.BaseColumn(
      this, 'html_url', false, false, lf.Type.STRING);
  cols.push(this.html_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.clone_url = new lf.schema.BaseColumn(
      this, 'clone_url', false, false, lf.Type.STRING);
  cols.push(this.clone_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.git_url = new lf.schema.BaseColumn(
      this, 'git_url', false, false, lf.Type.STRING);
  cols.push(this.git_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.ssh_url = new lf.schema.BaseColumn(
      this, 'ssh_url', false, false, lf.Type.STRING);
  cols.push(this.ssh_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.svn_url = new lf.schema.BaseColumn(
      this, 'svn_url', false, false, lf.Type.STRING);
  cols.push(this.svn_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.mirror_url = new lf.schema.BaseColumn(
      this, 'mirror_url', false, false, lf.Type.STRING);
  cols.push(this.mirror_url);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.homepage = new lf.schema.BaseColumn(
      this, 'homepage', false, false, lf.Type.STRING);
  cols.push(this.homepage);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.language = new lf.schema.BaseColumn(
      this, 'language', false, true, lf.Type.STRING);
  cols.push(this.language);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.forks_count = new lf.schema.BaseColumn(
      this, 'forks_count', false, false, lf.Type.INTEGER);
  cols.push(this.forks_count);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.stargazers_count = new lf.schema.BaseColumn(
      this, 'stargazers_count', false, false, lf.Type.INTEGER);
  cols.push(this.stargazers_count);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.watchers_count = new lf.schema.BaseColumn(
      this, 'watchers_count', false, false, lf.Type.INTEGER);
  cols.push(this.watchers_count);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.size = new lf.schema.BaseColumn(
      this, 'size', false, false, lf.Type.INTEGER);
  cols.push(this.size);

  /** @type {!lf.schema.BaseColumn.<string>} */
  this.default_branch = new lf.schema.BaseColumn(
      this, 'default_branch', false, false, lf.Type.STRING);
  cols.push(this.default_branch);

  /** @type {!lf.schema.BaseColumn.<number>} */
  this.open_issues_count = new lf.schema.BaseColumn(
      this, 'open_issues_count', false, false, lf.Type.INTEGER);
  cols.push(this.open_issues_count);

  /** @type {!lf.schema.BaseColumn.<boolean>} */
  this.has_issues = new lf.schema.BaseColumn(
      this, 'has_issues', false, false, lf.Type.BOOLEAN);
  cols.push(this.has_issues);

  /** @type {!lf.schema.BaseColumn.<boolean>} */
  this.has_wiki = new lf.schema.BaseColumn(
      this, 'has_wiki', false, false, lf.Type.BOOLEAN);
  cols.push(this.has_wiki);

  /** @type {!lf.schema.BaseColumn.<boolean>} */
  this.has_pages = new lf.schema.BaseColumn(
      this, 'has_pages', false, false, lf.Type.BOOLEAN);
  cols.push(this.has_pages);

  /** @type {!lf.schema.BaseColumn.<boolean>} */
  this.has_downloads = new lf.schema.BaseColumn(
      this, 'has_downloads', false, false, lf.Type.BOOLEAN);
  cols.push(this.has_downloads);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.pushed_at = new lf.schema.BaseColumn(
      this, 'pushed_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.pushed_at);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.created_at = new lf.schema.BaseColumn(
      this, 'created_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.created_at);

  /** @type {!lf.schema.BaseColumn.<!Date>} */
  this.updated_at = new lf.schema.BaseColumn(
      this, 'updated_at', false, false, lf.Type.DATE_TIME);
  cols.push(this.updated_at);

  var indices = [
    new lf.schema.Index('Repositories', 'pkRepositories', true,
        [
          {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
        ])
  ];

  closeyourissues.db.schema.Repositories.base(
      this, 'constructor', 'Repositories', cols, indices, false);
};
goog.inherits(closeyourissues.db.schema.Repositories, lf.schema.Table);


/** @override */
closeyourissues.db.schema.Repositories.prototype.createRow = function(opt_value) {
  return new closeyourissues.db.row.Repositories(lf.Row.getNextId(), opt_value);
};


/** @override */
closeyourissues.db.schema.Repositories.prototype.deserializeRow =
    function(dbRecord) {
  var data = dbRecord['value'];
  data.pushed_at = new Date(data.pushed_at);
  data.created_at = new Date(data.created_at);
  data.updated_at = new Date(data.updated_at);
  return new closeyourissues.db.row.Repositories(dbRecord['id'], data);
};


/** @override */
closeyourissues.db.schema.Repositories.prototype.getConstraint = function() {
  var pk = new lf.schema.Index('Repositories', 'pkRepositories', true,
      [
        {schema: this.id, order: lf.Order.ASC, autoIncrement: false}
      ]);
  var notNullable = [
    this.id,
    this.owner,
    this.name,
    this.full_name,
    this.description,
    this.private,
    this.fork,
    this.url,
    this.html_url,
    this.clone_url,
    this.git_url,
    this.ssh_url,
    this.svn_url,
    this.mirror_url,
    this.homepage,
    this.forks_count,
    this.stargazers_count,
    this.watchers_count,
    this.size,
    this.default_branch,
    this.open_issues_count,
    this.has_issues,
    this.has_wiki,
    this.has_pages,
    this.has_downloads,
    this.pushed_at,
    this.created_at,
    this.updated_at
  ];
  var foreignKeys = [];
  var unique = [
  ];
  return new lf.schema.Constraint(pk, notNullable, foreignKeys, unique);
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.RepositoriesType = function() {
  /** @export @type {number} */
  this.id;
  /** @export @type {number} */
  this.owner;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.full_name;
  /** @export @type {string} */
  this.description;
  /** @export @type {boolean} */
  this.private;
  /** @export @type {boolean} */
  this.fork;
  /** @export @type {string} */
  this.url;
  /** @export @type {string} */
  this.html_url;
  /** @export @type {string} */
  this.clone_url;
  /** @export @type {string} */
  this.git_url;
  /** @export @type {string} */
  this.ssh_url;
  /** @export @type {string} */
  this.svn_url;
  /** @export @type {string} */
  this.mirror_url;
  /** @export @type {string} */
  this.homepage;
  /** @export @type {?string} */
  this.language;
  /** @export @type {number} */
  this.forks_count;
  /** @export @type {number} */
  this.stargazers_count;
  /** @export @type {number} */
  this.watchers_count;
  /** @export @type {number} */
  this.size;
  /** @export @type {string} */
  this.default_branch;
  /** @export @type {number} */
  this.open_issues_count;
  /** @export @type {boolean} */
  this.has_issues;
  /** @export @type {boolean} */
  this.has_wiki;
  /** @export @type {boolean} */
  this.has_pages;
  /** @export @type {boolean} */
  this.has_downloads;
  /** @export @type {!Date} */
  this.pushed_at;
  /** @export @type {!Date} */
  this.created_at;
  /** @export @type {!Date} */
  this.updated_at;
};



/**
 * @export
 * @constructor
 * @struct
 * @final
 */
closeyourissues.db.row.RepositoriesDbType = function() {
  /** @export @type {number} */
  this.id;
  /** @export @type {number} */
  this.owner;
  /** @export @type {string} */
  this.name;
  /** @export @type {string} */
  this.full_name;
  /** @export @type {string} */
  this.description;
  /** @export @type {boolean} */
  this.private;
  /** @export @type {boolean} */
  this.fork;
  /** @export @type {string} */
  this.url;
  /** @export @type {string} */
  this.html_url;
  /** @export @type {string} */
  this.clone_url;
  /** @export @type {string} */
  this.git_url;
  /** @export @type {string} */
  this.ssh_url;
  /** @export @type {string} */
  this.svn_url;
  /** @export @type {string} */
  this.mirror_url;
  /** @export @type {string} */
  this.homepage;
  /** @export @type {?string} */
  this.language;
  /** @export @type {number} */
  this.forks_count;
  /** @export @type {number} */
  this.stargazers_count;
  /** @export @type {number} */
  this.watchers_count;
  /** @export @type {number} */
  this.size;
  /** @export @type {string} */
  this.default_branch;
  /** @export @type {number} */
  this.open_issues_count;
  /** @export @type {boolean} */
  this.has_issues;
  /** @export @type {boolean} */
  this.has_wiki;
  /** @export @type {boolean} */
  this.has_pages;
  /** @export @type {boolean} */
  this.has_downloads;
  /** @export @type {number} */
  this.pushed_at;
  /** @export @type {number} */
  this.created_at;
  /** @export @type {number} */
  this.updated_at;
};



/**
 * Constructs a new Repositories row.
 * @constructor
 * @extends {lf.Row.<!closeyourissues.db.row.RepositoriesType,
 *     !closeyourissues.db.row.RepositoriesDbType>}
 *
 * @param {number} rowId The row ID.
 * @param {!closeyourissues.db.row.RepositoriesType=} opt_payload
 */
closeyourissues.db.row.Repositories = function(rowId, opt_payload) {
  closeyourissues.db.row.Repositories.base(this, 'constructor', rowId, opt_payload);
};
goog.inherits(closeyourissues.db.row.Repositories, lf.Row);


/** @override */
closeyourissues.db.row.Repositories.prototype.defaultPayload = function() {
  var payload = new closeyourissues.db.row.RepositoriesType();
  payload.id = 0;
  payload.owner = 0;
  payload.name = '';
  payload.full_name = '';
  payload.description = '';
  payload.private = false;
  payload.fork = false;
  payload.url = '';
  payload.html_url = '';
  payload.clone_url = '';
  payload.git_url = '';
  payload.ssh_url = '';
  payload.svn_url = '';
  payload.mirror_url = '';
  payload.homepage = '';
  payload.language = null;
  payload.forks_count = 0;
  payload.stargazers_count = 0;
  payload.watchers_count = 0;
  payload.size = 0;
  payload.default_branch = '';
  payload.open_issues_count = 0;
  payload.has_issues = false;
  payload.has_wiki = false;
  payload.has_pages = false;
  payload.has_downloads = false;
  payload.pushed_at = new Date(0);
  payload.created_at = new Date(0);
  payload.updated_at = new Date(0);
  return payload;
};


/** @override */
closeyourissues.db.row.Repositories.prototype.toDbPayload = function() {
  var payload = new closeyourissues.db.row.RepositoriesDbType();
  payload.id = this.payload().id;
  payload.owner = this.payload().owner;
  payload.name = this.payload().name;
  payload.full_name = this.payload().full_name;
  payload.description = this.payload().description;
  payload.private = this.payload().private;
  payload.fork = this.payload().fork;
  payload.url = this.payload().url;
  payload.html_url = this.payload().html_url;
  payload.clone_url = this.payload().clone_url;
  payload.git_url = this.payload().git_url;
  payload.ssh_url = this.payload().ssh_url;
  payload.svn_url = this.payload().svn_url;
  payload.mirror_url = this.payload().mirror_url;
  payload.homepage = this.payload().homepage;
  payload.language = this.payload().language;
  payload.forks_count = this.payload().forks_count;
  payload.stargazers_count = this.payload().stargazers_count;
  payload.watchers_count = this.payload().watchers_count;
  payload.size = this.payload().size;
  payload.default_branch = this.payload().default_branch;
  payload.open_issues_count = this.payload().open_issues_count;
  payload.has_issues = this.payload().has_issues;
  payload.has_wiki = this.payload().has_wiki;
  payload.has_pages = this.payload().has_pages;
  payload.has_downloads = this.payload().has_downloads;
  payload.pushed_at = this.payload().pushed_at.getTime();
  payload.created_at = this.payload().created_at.getTime();
  payload.updated_at = this.payload().updated_at.getTime();
  return payload;
};


/** @override */
closeyourissues.db.row.Repositories.prototype.keyOfIndex = function(indexName) {
  switch (indexName) {
    case 'Repositories.pkRepositories':
      return this.payload().id;
    case 'Repositories.#':
      return this.id();
    default:
      break;
  }
  return null;
};


/** @return {number} */
closeyourissues.db.row.Repositories.prototype.getId = function() {
  return this.payload().id;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setId = function(value) {
  this.payload().id = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Repositories.prototype.getOwner = function() {
  return this.payload().owner;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setOwner = function(value) {
  this.payload().owner = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getName = function() {
  return this.payload().name;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setName = function(value) {
  this.payload().name = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getFull_name = function() {
  return this.payload().full_name;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setFull_name = function(value) {
  this.payload().full_name = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getDescription = function() {
  return this.payload().description;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setDescription = function(value) {
  this.payload().description = value;
  return this;
};


/** @return {boolean} */
closeyourissues.db.row.Repositories.prototype.getPrivate = function() {
  return this.payload().private;
};


/**
 * @param {boolean} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setPrivate = function(value) {
  this.payload().private = value;
  return this;
};


/** @return {boolean} */
closeyourissues.db.row.Repositories.prototype.getFork = function() {
  return this.payload().fork;
};


/**
 * @param {boolean} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setFork = function(value) {
  this.payload().fork = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getUrl = function() {
  return this.payload().url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setUrl = function(value) {
  this.payload().url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getHtml_url = function() {
  return this.payload().html_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setHtml_url = function(value) {
  this.payload().html_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getClone_url = function() {
  return this.payload().clone_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setClone_url = function(value) {
  this.payload().clone_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getGit_url = function() {
  return this.payload().git_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setGit_url = function(value) {
  this.payload().git_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getSsh_url = function() {
  return this.payload().ssh_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setSsh_url = function(value) {
  this.payload().ssh_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getSvn_url = function() {
  return this.payload().svn_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setSvn_url = function(value) {
  this.payload().svn_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getMirror_url = function() {
  return this.payload().mirror_url;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setMirror_url = function(value) {
  this.payload().mirror_url = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getHomepage = function() {
  return this.payload().homepage;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setHomepage = function(value) {
  this.payload().homepage = value;
  return this;
};


/** @return {?string} */
closeyourissues.db.row.Repositories.prototype.getLanguage = function() {
  return this.payload().language;
};


/**
 * @param {?string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setLanguage = function(value) {
  this.payload().language = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Repositories.prototype.getForks_count = function() {
  return this.payload().forks_count;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setForks_count = function(value) {
  this.payload().forks_count = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Repositories.prototype.getStargazers_count = function() {
  return this.payload().stargazers_count;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setStargazers_count = function(value) {
  this.payload().stargazers_count = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Repositories.prototype.getWatchers_count = function() {
  return this.payload().watchers_count;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setWatchers_count = function(value) {
  this.payload().watchers_count = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Repositories.prototype.getSize = function() {
  return this.payload().size;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setSize = function(value) {
  this.payload().size = value;
  return this;
};


/** @return {string} */
closeyourissues.db.row.Repositories.prototype.getDefault_branch = function() {
  return this.payload().default_branch;
};


/**
 * @param {string} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setDefault_branch = function(value) {
  this.payload().default_branch = value;
  return this;
};


/** @return {number} */
closeyourissues.db.row.Repositories.prototype.getOpen_issues_count = function() {
  return this.payload().open_issues_count;
};


/**
 * @param {number} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setOpen_issues_count = function(value) {
  this.payload().open_issues_count = value;
  return this;
};


/** @return {boolean} */
closeyourissues.db.row.Repositories.prototype.getHas_issues = function() {
  return this.payload().has_issues;
};


/**
 * @param {boolean} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setHas_issues = function(value) {
  this.payload().has_issues = value;
  return this;
};


/** @return {boolean} */
closeyourissues.db.row.Repositories.prototype.getHas_wiki = function() {
  return this.payload().has_wiki;
};


/**
 * @param {boolean} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setHas_wiki = function(value) {
  this.payload().has_wiki = value;
  return this;
};


/** @return {boolean} */
closeyourissues.db.row.Repositories.prototype.getHas_pages = function() {
  return this.payload().has_pages;
};


/**
 * @param {boolean} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setHas_pages = function(value) {
  this.payload().has_pages = value;
  return this;
};


/** @return {boolean} */
closeyourissues.db.row.Repositories.prototype.getHas_downloads = function() {
  return this.payload().has_downloads;
};


/**
 * @param {boolean} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setHas_downloads = function(value) {
  this.payload().has_downloads = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.Repositories.prototype.getPushed_at = function() {
  return this.payload().pushed_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setPushed_at = function(value) {
  this.payload().pushed_at = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.Repositories.prototype.getCreated_at = function() {
  return this.payload().created_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setCreated_at = function(value) {
  this.payload().created_at = value;
  return this;
};


/** @return {!Date} */
closeyourissues.db.row.Repositories.prototype.getUpdated_at = function() {
  return this.payload().updated_at;
};


/**
 * @param {!Date} value
 * @return {!closeyourissues.db.row.Repositories}
*/
closeyourissues.db.row.Repositories.prototype.setUpdated_at = function(value) {
  this.payload().updated_at = value;
  return this;
};
goog.provide('closeyourissues.db');

goog.require('closeyourissues.db.schema.Database');
goog.require('lf.Global');
/** @suppress {extraRequire} */
goog.require('lf.fn');
/** @suppress {extraRequire} */
goog.require('lf.op');
goog.require('lf.proc.Database');
goog.require('lf.service');
goog.require('lf.service.ServiceId');


/**
 * @return {!lf.Global} The Global instance that refers to closeyourissues.db.
 */
closeyourissues.db.getGlobal = function() {
  var namespacedGlobalId = new lf.service.ServiceId('ns_close_your_issues');
  var global = lf.Global.get();

  var namespacedGlobal = null;
  if (!global.isRegistered(namespacedGlobalId)) {
    namespacedGlobal = new lf.Global();
    global.registerService(namespacedGlobalId, namespacedGlobal);
  } else {
    namespacedGlobal = global.getService(namespacedGlobalId);
  }

  return namespacedGlobal;
};


/** @return {!lf.schema.Database} */
closeyourissues.db.getSchema = function() {
  var global = closeyourissues.db.getGlobal();

  if (!global.isRegistered(lf.service.SCHEMA)) {
    var schema = new closeyourissues.db.schema.Database();
    global.registerService(lf.service.SCHEMA, schema);
  }
  return global.getService(lf.service.SCHEMA);
};


/**
 * @param {!lf.schema.ConnectOptions=} opt_options
 * @return {!IThenable<!lf.proc.Database>}
 */
closeyourissues.db.connect = function(opt_options) {
  closeyourissues.db.getSchema();
  var db = new lf.proc.Database(closeyourissues.db.getGlobal());
  return db.init(opt_options);
};
