"use strict";
// ChromeでJavaScriptからIndexedDbを初期化する - Qiita
// http://qiita.com/mizchi/items/54f4b0f30990d48a1350

module.exports = function() {
  var getDbNames, removeAllIndexedDb, resetAllIndexedDb;
  getDbNames = function() {
    return new Promise(function(done, reject) {
      var req;
      req = indexedDB.webkitGetDatabaseNames();
      req.addEventListener("success", function(event) {
        var dbNames, i;
        dbNames = (function() {
          var j, len, ref, results;
          ref = event.target.result;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            i = ref[j];
            results.push(i);
          }
          return results;
        })();
        return done(dbNames);
      });
      return req.addEventListener("error", function(event) {
        return reject();
      });
    });
  };
  removeAllIndexedDb = function(dbNames) {
    return Promise.all(dbNames.map(function(name) {
      return new Promise(function(done, reject) {
        var req;
        req = indexedDB.deleteDatabase(name);
        req.addEventListener("success", function() {
          return done();
        });
        return req.addEventListener("error", function() {
          return reject();
        });
      });
    }));
  };
  resetAllIndexedDb = function() {
    return new Promise(function(done) {
      return getDbNames().then(function(names) {
        return removeAllIndexedDb(names).then(function() {
          console.info("all items removed!");
          return done();
        });
      });
    });
  };
  return function() {
    localStorage.clear();
    return resetAllIndexedDb();
  };
};
