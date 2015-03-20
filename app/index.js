(function () {
  'use strict';

  var idb = document.getElementById('idb');

  var db = new PouchDB('close-your-issues').info().then(function () {
    idb.innerHTML = '&#10003';
  }).catch(function (err) {
    idb.innerHTML = "Nope, got an error: " + err;
  });
})();
