/* eslint strict: 0 */
(function () {
  var gui = require('nw.gui');
  if (process.platform === 'darwin') {
    var mb = new gui.Menu({type: 'menubar'});
    mb.createMacBuiltin('CloseYourIssues', {
      hideEdit: false
    });
    gui.Window.get().menu = mb;
  }

  //var idb = window.document.getElementById('idb');
})();
