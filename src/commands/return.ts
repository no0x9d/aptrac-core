import {baseCommand} from './common/baseCommand';
import {createTask} from '../actions/create';
import {editTask} from '../actions/edit';
import {endTask} from '../actions/end';
import {findOne} from '../actions/findOne';
import {findById} from '../actions/findById';
import {findLast} from '../actions/findLast';

export function rerun(options, doneOutput) {

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
    endTask,
    createTask,
    editTask,
    findOne
  ];
  baseCommand.call(this, options, actions, doneOutput);
}
