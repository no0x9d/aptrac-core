import {baseCommand} from './common/baseCommand';
import {editTask} from '../actions/edit';
import {findTasks} from '../actions/find';
import {generateChanges} from '../actions/generateChanges';
import {queryBuilder} from './common/queryBuilder';

export function edit(options, doneOutput) {

  var query = options.id || (options.options && options.options.id) ?
    queryBuilder('findById') : queryBuilder('findCurrent');

  var actions = [
    generateChanges.fill(undefined, false),
    query,
    editTask,
    findTasks
  ];

  baseCommand.call(this, options, actions, doneOutput);
}
