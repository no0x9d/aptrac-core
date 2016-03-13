import defaultConfig from './defaultConfig';
import {Config} from './config';

export = function configFactory() {
  "use strict";
  var config = new Config();
  config.addSource(defaultConfig);
  return config;
};
