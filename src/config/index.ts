var defaultConfig = require('./defaultConfig'),
    Config        = require('./config');

export = function configFactory() {
  "use strict";
  var config = new Config();
  config.addSource(defaultConfig);
  return config;
};
