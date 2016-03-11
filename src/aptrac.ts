require('sugar');
require('moment-duration-format');

import startCommand  = require('./commands/start');
import editCommand   = require('./commands/edit');
import endCommand    = require('./commands/end');
import killCommand   = require('./commands/kill');
import returnCommand = require('./commands/return');
import listCommand   = require('./commands/list');
import nowCommand    = require('./commands/now');
import setCommand    = require('./commands/set');
import splitCommand  = require('./commands/split');
import unsetCommand  = require('./commands/unset');
import model         = require('./model');
import Config        = require('./config');
import initDb        = require('./util/init-db');
import path          = require('path');

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

Aptrac.prototype.start = startCommand;
Aptrac.prototype.edit = editCommand;
Aptrac.prototype.end = endCommand;
Aptrac.prototype.kill = killCommand;
Aptrac.prototype.return = returnCommand;
Aptrac.prototype.list = listCommand;
Aptrac.prototype.now = nowCommand;
Aptrac.prototype.set = setCommand;
Aptrac.prototype.split = splitCommand;
Aptrac.prototype.unset = unsetCommand;

export = Aptrac;
