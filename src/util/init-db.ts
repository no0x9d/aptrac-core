var Datastore = require('nedb');

export = function initDb(options, config) {
  "use strict";

  var filename = options && options.db !== undefined ? options.db : config.get('db');

  return new Datastore({filename: filename, autoload: true});
};
