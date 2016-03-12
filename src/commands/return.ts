import baseCommand = require('./common/baseCommand');
import create      = require('../actions/create');
import edit        = require('../actions/edit');
import end         = require('../actions/end');
import findOne     = require('../actions/findOne');
import findById    = require('../actions/findById');
import findLast    = require('../actions/findLast');

export = function rerun(options, doneOutput) {

    var findMethod;
    if (options.id || (options.isContext && options.options.id)) {
        findMethod = findById;
    } else {
        findMethod = findLast;
    }

    var actions = [
        findMethod,
        // update changes from found task
        function saveLoadedFields(context, task, done) {
            context.changes = {
                task: task.task,
                project: task.project,
                note: task.note,
                start: context.options.start
            };
            done(null, context);
        },
        end,
        create,
        edit,
        findOne
    ];
    baseCommand.call(this, options, actions, doneOutput);
};
