"use strict";

import removeTrailingSlash from "myUtils/removeTrailingSlash";

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

export const saveUsersAndRepositories = async (repositories) => {
  let db = await dbConnection();

  // set up users
  let usersTable = await db.getSchema().table("Users");
  let userRows = repositories.reduce((previous, current) => {
    /* eslint-disable camelcase */
    let userParams = Object.assign({}, current.owner);
    userParams.created_at = null;
    userParams.updated_at = null;
    /* eslint-eable camelcase */

    previous.push(
      usersTable.createRow(userParams)
    );
    return previous;
  }, []);

  // insert_or_replace users
  await db.insertOrReplace().into(usersTable).values(userRows).exec();

  // set up repositories
  let repositoriesTable = await db.getSchema().table("Repositories");
  let repositoryRows = repositories.reduce((previous, current) => {
    /* eslint-disable camelcase */
    let repositoryParams = Object.assign({}, current);
    let permissions = Object.assign({}, current.permissions);
    let owner = Object.assign({}, current.owner);
    delete repositoryParams.owner;
    delete repositoryParams.permissions;
    repositoryParams.organization = 0;
    repositoryParams.owner = owner.id;
    repositoryParams.permissions_admin = permissions.admin;
    repositoryParams.permissions_push = permissions.push;
    repositoryParams.permissions_pull = permissions.pull;
    repositoryParams.created_at = new Date(current.created_at);
    repositoryParams.updated_at = new Date(current.updated_at);
    repositoryParams.pushed_at = new Date(current.pushed_at);
    /* eslint-eable camelcase */

    previous.push(
      repositoriesTable.createRow(repositoryParams)
    );
    return previous;
  }, []);

  // insert_or_replace repositories
  return await db.insertOrReplace().into(repositoriesTable).values(repositoryRows).exec();
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
  console.log(results);
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
