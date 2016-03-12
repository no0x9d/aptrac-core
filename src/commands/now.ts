import baseCommand = require('./common/baseCommand');
import findCurrent = require('../actions/findCurrent');

export = function now(options, doneOutput) {
    "use strict";
    var actions = [
        findCurrent
    ];

    baseCommand.call(this, options, actions, doneOutput);
};
