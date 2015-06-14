"use strict";
import githubUrl from "github-url-to-object";

module.exports = (repo) => {
  const githubObject = githubUrl(repo);
  return `${githubObject.user}/${githubObject.repo}`;
};
