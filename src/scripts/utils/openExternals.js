'use strict';
module.exports = (event) => {
  if(window.gui) {
    event.preventDefault();
    window.gui.Shell.openExternal(event.target.href);
  }
};
