"use strict";

import axios from "axios";

// https://developer.github.com/v3/repos/#get
// GET /repos/:owner/:repo
module.exports = async (repositoryUrl, config) => {
  return await axios.get(repositoryUrl, config);
};
