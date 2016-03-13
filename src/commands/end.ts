import {baseCommand} from './common/baseCommand';
import {editTask} from '../actions/edit';
import {endTask} from '../actions/end';
import {findOne} from '../actions/findOne';
import {generateChanges} from '../actions/generateChanges';
import {queryBuilder} from './common/queryBuilder';

export function end(options, doneOutput) {
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
    editTask,
    function mapArguments(context, query, done) { // map arguments for next function call
      done(null, context);
    },
    endTask,
    function queryForEndedTask(context, done) {
      done(null, context, {_id: context.task._id});
    },
    findOne
  ];
  baseCommand.call(this, options, actions, doneOutput);
}
