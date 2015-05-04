"use strict";

import axios from "axios";

// https://developer.github.com/v3/issues/#edit-an-issue
// PATCH /repos/:owner/:repo/issues/:number
module.exports = async (issueUrl, data, config) => {
  return await axios.patch(issueUrl, data, config);
};
