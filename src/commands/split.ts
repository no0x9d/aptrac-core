import {baseCommand} from './common/baseCommand';
import {findTasks} from '../actions/find';
import {findOne} from '../actions/findOne';
import {generateChanges} from '../actions/generateChanges';
import {splitTask} from '../actions/split';
import {queryBuilder} from './common/queryBuilder';

export function split(options, doneOutput) {

  function isIdPresent(options) {
    options = options || options;
    return options.id || (options.options && options.options.id);
  }

  var query = isIdPresent(options) ? queryBuilder('findById') : queryBuilder('findCurrent');

  var actions = [
    generateChanges.fill(undefined, false),
    query,
    findOne,
    splitTask,
    findTasks
  ];

  baseCommand.call(this, options, actions, doneOutput);
}
