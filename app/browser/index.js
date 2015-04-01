(function () {
  'use strict';

  var gui = require('nw.gui');
  if (process.platform === 'darwin') {
    var mb = new gui.Menu({type: 'menubar'});
    mb.createMacBuiltin('CloseYourIssues', {
      hideEdit: false
    });
    gui.Window.get().menu = mb;
  }

  var idb = window.document.getElementById('idb');

  window.db = new PouchDB('close-your-issues').info().then(function () {
    idb.innerHTML = '&#10003';
  }).catch(function (err) {
    idb.innerHTML = 'Nope, got an error: ' + err;
  });
})();
