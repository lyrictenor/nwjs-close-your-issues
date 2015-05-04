"use strict";

import axios from "axios";

// https://developer.github.com/v3/git/refs/#delete-a-reference
// DELETE /repos/:owner/:repo/git/refs/:ref
// DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a
module.exports = async (refsUrl, config) => {
  return await axios.delete(refsUrl, config);
};
