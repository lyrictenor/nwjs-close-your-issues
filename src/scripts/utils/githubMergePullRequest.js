"use strict";

import axios from "axios";

// https://developer.github.com/v3/pulls/#merge-a-pull-request-merge-button
// PUT /repos/:owner/:repo/pulls/:number/merge
module.exports = async (pullRequestUrl, data, config) => {
  const apiUrl = `${pullRequestUrl}/merge`;
  return await axios.put(apiUrl, data, config);
};
