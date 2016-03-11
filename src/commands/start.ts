import baseCommand     = require('./common/baseCommand');
import create          = require('../actions/create');
import edit            = require('../actions/edit');
import end             = require('../actions/end');
import findOne         = require('../actions/findOne');
import generateChanges = require('../actions/generateChanges');

export = function start(options, doneOutput) {
    "use strict";
    if (!options.start && !(options.options && options.options.start)) {
        return doneOutput(Error("no start date provided"));
    }

    var actions = [
        generateChanges.fill(undefined, true),
        end,
        create,
        edit,
        findOne
    ];

    baseCommand.call(this, options, actions, doneOutput, true);
};