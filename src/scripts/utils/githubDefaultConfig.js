"use strict";

module.exports = (token) => {
  if (token) {
    return {
      headers: {
        Accept: "application/vnd.github.v3.text+json",
        Authorization: `token ${token}`
      }
    };
  } else {
    return {
      headers: {
        Accept: "application/vnd.github.v3.text+json"
      }
    };
  }
};
