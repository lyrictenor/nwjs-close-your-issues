'use strict';
import GithubUrl from 'github-url-to-object';

module.exports = (repo) => {
  const GithubObject = GithubUrl(repo);
  return `${GithubObject.user}/${GithubObject.repo}`;
};
