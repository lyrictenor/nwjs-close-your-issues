"use strict";
import axios from "axios";

// https://developer.github.com/v3/issues/#list-issues
// GET /issues
module.exports = async (url, config) => {
  return await axios.get(url, config);
};
