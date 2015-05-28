"use strict";

import axios from "axios";

// https://developer.github.com/v3/pulls/#list-pull-requests
// GET /repos/:owner/:repo/pulls
module.exports = async (pullRequestsUrl, config) => {
  return await axios.get(pullRequestsUrl, config);
};
