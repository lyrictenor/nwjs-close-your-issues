'use strict';

module.exports = (string, length=100) => {
  return `${string.slice(0, length)}...`;
};
