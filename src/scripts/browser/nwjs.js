/* eslint strict: 0 */
(function () {
  if (typeof process === 'object' && process.platform === 'darwin') {
    var gui = require('nw.gui');
    var mb = new gui.Menu({type: 'menubar'});
    mb.createMacBuiltin('CloseYourIssues');
    gui.Window.get().menu = mb;
  }

  //var idb = window.document.getElementById('idb');
})();
