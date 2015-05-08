"use strict";
import axios from "axios";

// https://developer.github.com/v3/repos/#list-your-repositories
// GET /user/repos
module.exports = async (currentUserRepositoriesUrl, config) => {
  return await axios.get(currentUserRepositoriesUrl, config);
};
