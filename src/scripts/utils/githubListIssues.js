"use strict";
import axios from "axios";

// https://developer.github.com/v3/issues/#list-issues
// GET /issues
module.exports = async (issuesUrl, config) => {
  return await axios.get(issuesUrl, config);
};
