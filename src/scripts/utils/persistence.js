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

const persistConfigParams = async (params) => {
  let db = await window.closeyourissues.db.connect();
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
  let db = await window.closeyourissues.db.connect();
  let configTables = await db.getSchema().table("Configs");
  let results = await db.select().from(configTables).exec();
  console.log(results);
  return results;
};

const dataToParams = (data) => {
  return data.reduce((previous, current) => {
    previous[current.key] = current.value;
    return previous;
  }, {});
};
