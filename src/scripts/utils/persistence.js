"use strict";

import removeTrailingSlash from "myUtils/removeTrailingSlash";
import githubSlug from "myUtils/githubSlug";

export const initConfig = async () => {
  const savedParams = dataToParams(await getPersistedConfigData());

  // mapping
  let params = {};
  params.apiendpoint = removeTrailingSlash(savedParams.apiendpoint || defaultValues.apiendpoint);
  params.webendpoint = removeTrailingSlash(savedParams.webendpoint || defaultValues.webendpoint);
  params.token = savedParams.token || "";
  params.slug = removeTrailingSlash(savedParams.slug || defaultValues.slug);

  await persistConfigParams(params);
  return params;
};

export const saveConfig = async (settings) => {
  // mapping
  let params = {};
  params.apiendpoint = removeTrailingSlash(settings.apiendpoint);
  params.webendpoint = removeTrailingSlash(settings.webendpoint);
  params.token = settings.token;
  params.slug = removeTrailingSlash(settings.slug);

  await persistConfigParams(params);
  return params;
};

export const defaultValues = require("../../config_settings.json");

const doesRowsIncludesId = (rows, id) => {
  const ids = rows.map((row) => {
    return row.payload_.id;
  });
  return ids.indexOf(id) !== -1;
};

export const saveUsersAndRepositories = async (repositories) => {
  let db = await dbConnection();

  // set up users
  let usersTable = await db.getSchema().table("Users");
  let userRows = repositories.reduce((previous, current) => {
    if(current.owner && !doesRowsIncludesId(previous, current.owner.id)) {
      /* eslint-disable camelcase */
      let userParams = Object.assign({}, current.owner);
      userParams.created_at = (userParams.created_at) ? new Date(userParams.created_at) : null;
      userParams.updated_at = (userParams.updated_at) ? new Date(userParams.updated_at) : null;
      /* eslint-eable camelcase */

      previous.push(
        usersTable.createRow(userParams)
      );
    }
    return previous;
  }, []);

  // insert_or_replace users
  await db.insertOrReplace().into(usersTable).values(userRows).exec();

  // set up repositories
  let repositoriesTable = await db.getSchema().table("Repositories");
  let repositoryRows = repositories.reduce((previous, current) => {
    /* eslint-disable camelcase */
    let repositoryParams = Object.assign({}, current);
    const owner = Object.assign({}, current.owner);
    delete repositoryParams.owner;
    repositoryParams.owner = owner.id;
    repositoryParams.created_at = new Date(current.created_at);
    repositoryParams.updated_at = new Date(current.updated_at);
    repositoryParams.pushed_at = (current.pushed_at) ? new Date(current.pushed_at) : null;
    /* eslint-eable camelcase */

    previous.push(
      repositoriesTable.createRow(repositoryParams)
    );
    return previous;
  }, []);

  // insert_or_replace repositories
  return await db.insertOrReplace().into(repositoriesTable).values(repositoryRows).exec();
};

export const saveIssues = async (issues) => {
  let db = await dbConnection();
  let lf = window.lf;

  const ids = issues.map((issue) => {
    return issue.id;
  });
  // set up users from issue's repository's owner, issue's user, issue's assignee, issue's closed_by
  let usersTable = await db.getSchema().table("Users");
  let userRows = issues.reduce((previous, current) => {
    let userParams;
    // issue's repository's owner
    if (current.repository && current.repository.owner && !doesRowsIncludesId(previous, current.repository.owner.id)) {
      /* eslint-disable camelcase */
      userParams = Object.assign({}, current.repository.owner);
      userParams.created_at = (userParams.created_at) ? new Date(userParams.created_at) : null;
      userParams.updated_at = (userParams.updated_at) ? new Date(userParams.updated_at) : null;
      /* eslint-eable camelcase */

      previous.push(
        usersTable.createRow(userParams)
      );
    }

    // issue's user
    if (current.user && !doesRowsIncludesId(previous, current.user.id)) {
      /* eslint-disable camelcase */
      userParams = Object.assign({}, current.user);
      userParams.created_at = (userParams.created_at) ? new Date(userParams.created_at) : null;
      userParams.updated_at = (userParams.updated_at) ? new Date(userParams.updated_at) : null;
      /* eslint-eable camelcase */

      previous.push(
        usersTable.createRow(userParams)
      );
    }

    // issue's assignee
    if (current.assignee && !doesRowsIncludesId(previous, current.assignee.id)) {
      /* eslint-disable camelcase */
      userParams = Object.assign({}, current.assignee);
      userParams.created_at = (userParams.created_at) ? new Date(userParams.created_at) : null;
      userParams.updated_at = (userParams.updated_at) ? new Date(userParams.updated_at) : null;
      /* eslint-eable camelcase */

      previous.push(
        usersTable.createRow(userParams)
      );
    }
    // issue's closed_by
    if (current.closed_by && !doesRowsIncludesId(previous, current.closed_by.id)) {
      /* eslint-disable camelcase */
      userParams = Object.assign({}, current.closed_by);
      userParams.created_at = (userParams.created_at) ? new Date(userParams.created_at) : null;
      userParams.updated_at = (userParams.updated_at) ? new Date(userParams.updated_at) : null;
      /* eslint-eable camelcase */

      previous.push(
        usersTable.createRow(userParams)
      );
    }

    return previous;
  }, []);

  // insert_or_replace users
  await db.insertOrReplace().into(usersTable).values(userRows).exec();

  // set up repositories from issues
  let repositoriesTable = await db.getSchema().table("Repositories");
  let repositoryRows = issues.reduce((previous, current) => {
    if(current.repository) {
      /* eslint-disable camelcase */
      let repositoryParams = Object.assign({}, current.repository);
      const owner = Object.assign({}, current.owner);
      delete repositoryParams.owner;
      repositoryParams.owner = owner.id;
      repositoryParams.created_at = new Date(current.created_at);
      repositoryParams.updated_at = new Date(current.updated_at);
      repositoryParams.pushed_at = (current.pushed_at) ? new Date(current.pushed_at) : null;
      /* eslint-eable camelcase */

      previous.push(
        repositoriesTable.createRow(repositoryParams)
      );
    } else {
      // single issue response does not have repository
      // generate repository?
    }
    return previous;
  }, []);

  // insert_or_replace repositories
  await db.insertOrReplace().into(repositoriesTable).values(repositoryRows).exec();
  const repos = await db
    .select(repositoriesTable.id, repositoriesTable.full_name)
    .from(repositoriesTable)
    .exec();

  // set up issues
  let issuesTable = await db.getSchema().table("Issues");
  let issueRows = issues.reduce((previous, current) => {
    /* eslint-disable camelcase */
    let issueParams = Object.assign({}, current);
    const user = Object.assign({}, current.user);
    const assignee = Object.assign({}, current.assignee);
    const repository = Object.assign({}, current.repository);
    const closedBy = Object.assign({}, current.closed_by);
    delete issueParams.assignee;
    delete issueParams.user;
    delete issueParams.repository;
    delete issueParams.closed_by;
    issueParams.user = user.id;
    issueParams.assignee = assignee.id;
    // single issue response does not have repository
    issueParams.repository = repository.id || (currentRepository(repos, issueParams.html_url) || {}).id;
    issueParams.closed_by = closedBy.id;
    issueParams.created_at = new Date(current.created_at);
    issueParams.updated_at = new Date(current.updated_at);
    issueParams.closed_at = (current.closed_at) ? new Date(current.closed_at) : null;
    /* eslint-eable camelcase */

    previous.push(
      issuesTable.createRow(issueParams)
    );
    return previous;
  }, []);

  // insert_or_replace issues
  await db.insertOrReplace().into(issuesTable).values(issueRows).exec();

  let results = await db
    .select()
    .from(issuesTable)
    .innerJoin(repositoriesTable, issuesTable.repository.eq(repositoriesTable.id))
    .innerJoin(usersTable, issuesTable.user.eq(usersTable.id))
    .where(issuesTable.id.in(ids))
    .orderBy(issuesTable.updated_at, lf.Order.DESC)
    .exec();
  return results.map((result) => {
    let issue = Object.assign({}, result.Issues);
    issue.repository = result.Repositories;
    issue.user = result.Users;
    return issue;
  });
};

export const getAllIssues = async (params = {}) => {
  let results = await getPersistedAllIssues();
  return results.map((result) => {
    let issue = Object.assign({}, result.Issues);
    issue.repository = result.Repositories;
    issue.user = result.Users;
    return issue;
  });
};

const getPersistedAllIssues = async (params = {}) => {
  let db = await dbConnection();
  let lf = window.lf;
  let issuesTable = await db.getSchema().table("Issues");
  let repositoriesTable = await db.getSchema().table("Repositories");
  let usersTable = await db.getSchema().table("Users");
  return await db
    .select()
    .from(issuesTable)
    .innerJoin(repositoriesTable, issuesTable.repository.eq(repositoriesTable.id))
    .innerJoin(usersTable, issuesTable.user.eq(usersTable.id))
    .orderBy(issuesTable.updated_at, lf.Order.DESC)
    .exec();
};

const currentRepository = (data, htmlUrl) => {
  const slug = githubSlug(htmlUrl);
  const repository = Array.find(data, (element) => {
    return element.full_name === slug;
  });
  return repository;
};

const persistConfigParams = async (params) => {
  let db = await dbConnection();
  let configTables = await db.getSchema().table("Configs");
  await db.delete().from(configTables).exec();

  let rows = Object.keys(params).reduce((previous, current) => {
    previous.push(
      configTables.createRow({
        key: current,
        value: params[current]
      })
    );
    return previous;
  }, []);
  return await db.insertOrReplace().into(configTables).values(rows).exec();
};

const getPersistedConfigData = async () => {
  let db = await dbConnection();
  let configTables = await db.getSchema().table("Configs");
  let results = await db.select().from(configTables).exec();
  return results;
};

const dbConnection = async () => {
  if(window.dbConnection) {
    return window.dbConnection;
  }
  window.dbConnection = await window.closeyourissues.db.connect();
  return window.dbConnection;
};

const dataToParams = (data) => {
  return data.reduce((previous, current) => {
    previous[current.key] = current.value;
    return previous;
  }, {});
};
