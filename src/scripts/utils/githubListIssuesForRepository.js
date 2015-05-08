"use strict";
import axios from "axios";

// https://developer.github.com/v3/issues/#list-issues-for-a-repository
// GET /repos/:owner/:repo/issues
module.exports = async (url, config) => {
  return await axios.get(url, config);
};
