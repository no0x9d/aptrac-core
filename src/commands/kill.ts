import {preHandleOptions} from './common/prehandleOptions';

export function kill(options, callback) {
  var context = preHandleOptions(options, this);
  options = context.options;

  var id = parseInt(options.id, 10);
  if (Number.isNaN(id)) {
    return callback(Error("malformated id: id is not a number"));
  }

  var db = context.db;

  db.remove({_id: id}, {}, function (err, numRemoved) {
    callback(err, context, numRemoved);
  });
}
