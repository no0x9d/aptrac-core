import baseCommand     = require('./common/baseCommand');
import edit            = require('../actions/edit');
import end             = require('../actions/end');
import findOne         = require('../actions/findOne');
import generateChanges = require('../actions/generateChanges');
import {queryBuilder} from './common/queryBuilder';

export = function (options, doneOutput) {
    "use strict";

    var task;

    var actions = [
        generateChanges.fill(undefined, false),
        queryBuilder("findCurrent"),
        findOne,
        function checkForRunningTask(context, t, done) {
            if (t == null) {
                return done(new Error('no running task to end'), context);
            } else {
                context.options.id = t._id;
                done(null, context);
            }
        },
        queryBuilder("findById"),
        edit,
        function mapArguments(context, query, done) { // map arguments for next function call
            done(null, context);
        },
        end,
        function queryForEndedTask(context, done) {
            done(null, context, {_id: context.task._id});
        },
        findOne
    ];
    baseCommand.call(this, options, actions, doneOutput);
};
