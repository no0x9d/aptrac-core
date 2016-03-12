import baseCommand     = require('./common/baseCommand');
import edit            = require('../actions/edit');
import find            = require('../actions/find');
import findOne         = require('../actions/findOne');
import generateChanges = require('../actions/generateChanges');
import split           = require('../actions/split');
import {queryBuilder} from './common/queryBuilder';

export = function (options, doneOutput) {

    var query = options.id || (options.options && options.options.id) ? queryBuilder('findById') : queryBuilder('findCurrent');

    var actions = [
        generateChanges.fill(undefined, false),
        query,
        findOne,
        split,
        find
    ];

    baseCommand.call(this, options, actions, doneOutput);
};