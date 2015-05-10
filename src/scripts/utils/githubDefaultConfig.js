"use strict";

module.exports = (token) => {
  if (token) {
    return {
      headers: {
        Accept: "application/vnd.github.moondragon.text+json",
        Authorization: `token ${token}`
      }
    };
  } else {
    return {
      headers: {
        Accept: "application/vnd.github.moondragon.text+json"
      }
    };
  }
};
