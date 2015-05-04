"use strict";

import axios from "axios";

// https://developer.github.com/v3/pulls/#get-a-single-pull-request
// GET /repos/:owner/:repo/pulls/:number
module.exports = async (pullRequestUrl, config) => {
  return await axios.get(pullRequestUrl, config);
};
