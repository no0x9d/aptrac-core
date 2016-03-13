import {baseCommand} from './common/baseCommand';
import {findCurrentTask} from '../actions/findCurrent';

export function now(options, doneOutput) {
  "use strict";
  var actions = [
    findCurrentTask
  ];

  baseCommand.call(this, options, actions, doneOutput);
}
