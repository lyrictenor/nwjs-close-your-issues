'use strict';
module.exports = (boolean) => {
  return (boolean) ? null : { disabled: 'disabled' };
};
