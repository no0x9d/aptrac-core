import baseCommand     = require('./common/baseCommand');
import edit            = require('../actions/edit');
import find            = require('../actions/find');
import generateChanges = require('../actions/generateChanges');
import {queryBuilder} from './common/queryBuilder';

export = function (options, doneOutput) {

    var query = options.id || (options.options && options.options.id) ?
        queryBuilder('findById') : queryBuilder('findCurrent');

    var actions = [
        generateChanges.fill(undefined, false),
        query,
        edit,
        find
    ];

    baseCommand.call(this, options, actions, doneOutput);
};
