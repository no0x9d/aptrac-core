import {getCurrentId} from '../util/id-helper';
export function createTask(args, done) {

  var db = args.db;

  getCurrentId(db, function (err, currentId) {
    if (err) {
      done(err);
    }
    // create new task
    db.insert({_id: currentId + 1}, function (err, newObj) {
      if (err) {
        done(err);
      }

      args.task = newObj;
      done(null, args, {_id: currentId + 1});
    });
  });
}
