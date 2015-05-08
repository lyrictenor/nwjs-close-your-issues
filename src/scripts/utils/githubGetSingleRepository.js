"use strict";

import axios from "axios";

// https://developer.github.com/v3/repos/#get
// GET GET /repos/:owner/:repo
module.exports = async (repoUrl, config) => {
  return await axios.get(repoUrl, config);
};
