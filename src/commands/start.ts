import {baseCommand} from './common/baseCommand';
import {createTask} from '../actions/create';
import {editTask} from '../actions/edit';
import {endTask} from '../actions/end';
import {findOne} from '../actions/findOne';
import {generateChanges} from '../actions/generateChanges';

export function start(options, doneOutput) {
  "use strict";
  if (!options.start && !(options.options && options.options.start)) {
    return doneOutput(Error("no start date provided"));
  }

  var actions = [
    generateChanges.fill(undefined, true),
    endTask,
    createTask,
    editTask,
    findOne
  ];

  baseCommand.call(this, options, actions, doneOutput, true);
}
