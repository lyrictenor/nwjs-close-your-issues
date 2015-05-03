"use strict";

module.exports = (string, length = 100, suffix = "...") => {
  if (string.length <= length) {
    return string;
  }
  return `${string.slice(0, length)}${suffix}`;
};
