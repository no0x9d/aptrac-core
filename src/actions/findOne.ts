import {deserializeTask} from'../util/deserialize';

export function findOne(args, search, done) {
  var db = args.db;

  // seatch for tasks with given search parameters
  db.findOne(search, function (err, result) {
    if (err) {
      done(err);
    }

    var task;
    //found task must not be null
    if (result != null) {
      task = deserializeTask(result);
    }

    args.task = task;
    done(null, args, task);
  });
}