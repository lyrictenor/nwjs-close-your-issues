"use strict";

import axios from "axios";

// https://developer.github.com/v3/issues/#get-a-single-issue
// GET /repos/:owner/:repo/issues/:number
module.exports = async (issueUrl, config) => {
  return await axios.get(issueUrl, config);
};
