"use strict";

module.exports = (string) => {
  if(typeof string !== "string") {
    return string;
  }
  return string.replace(/\/+$/, "");
};
