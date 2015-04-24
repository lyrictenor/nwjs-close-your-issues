'use strict';
module.exports = (url, event) => {
  if(window.gui) {
    event.preventDefault();
    window.gui.Shell.openExternal(url);
  }
};
