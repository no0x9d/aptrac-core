export function queryById(id) {
  var query;
  if (id) {
    if (Object.isArray(id)) {
      var queries = id.map(function (i) {
        return {_id: i};
      });
      query = {$or: queries};
    } else {
      query = {_id: id};
    }
  }
  return query;
}

export function queryCurrent() {
  return {end: {$exists: false}};
}

export function queryBuilder(queryType: string) {
  return function (context, done: Function) {
    var query;
    if (queryType === 'findCurrent') {
      query = queryCurrent();
    } else if (queryType === 'findById') {
      var id = context.options.id;
      query = queryById(id);
    }
    done(null, context, query);
  };
}
