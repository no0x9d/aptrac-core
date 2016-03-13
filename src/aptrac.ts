import 'sugar';
import 'moment-duration-format';

import {start} from './commands/start';
import {edit} from './commands/edit';
import {end} from './commands/end';
import {kill} from './commands/kill';
import {rerun} from './commands/return';
import {listTasks} from './commands/list';
import {now} from './commands/now';
import {set} from './commands/set';
import {split} from './commands/split';
import {unset} from './commands/unset';
import model         = require('./model');
import Config        = require('./config');
import {initDb} from './util/init-db';
import * as path from 'path';

function addConfigFile(config, options) {
  if (options && options.config) {
    var configPath = path.join(config.get('home'), options.config + ".cfg");
    config.addSource(configPath);
  }
}

function Aptrac(options, schema) {
  "use strict";

  this.schema = model.schema();
  if (schema) {
    this.schema.extend(schema);
  }

  this.config = Config();
  addConfigFile(this.config, options);

  this.db = initDb(options, this.config);
}

Aptrac.prototype.start = start;
Aptrac.prototype.edit = edit;
Aptrac.prototype.end = end;
Aptrac.prototype.kill = kill;
Aptrac.prototype.return = rerun;
Aptrac.prototype.list = listTasks;
Aptrac.prototype.now = now;
Aptrac.prototype.set = set;
Aptrac.prototype.split = split;
Aptrac.prototype.unset = unset;

export = Aptrac;
