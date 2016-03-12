import deserialize      = require('../util/deserialize');
import end              = require('../actions/end');
import moment           = require('moment');
import {queryBuilder, queryById} from './common/queryBuilder';
import {preHandleOptions} from './common/prehandleOptions';

export = function listTasks(options, output) {
  "use strict";
  var context = preHandleOptions(options, this);
  var from, to;
  var query;

  // handle query by id
  if (context.options.id) {
    query = queryById(context.options.id);
  } else { //handle time based queries
    // handle option flags and set 'from' & 'to'

    var unitOfTime = 'day';
    if (options.week) {
      unitOfTime = 'week';
    }
    if (options.month) {
      unitOfTime = 'month';
    }
    if (options.year) {
      unitOfTime = 'year';
    }
    from = moment().startOf(unitOfTime);
    to = moment().endOf(unitOfTime);

    if (options.last) {
      from = from.subtract(1, unitOfTime);
      to = to.subtract(1, unitOfTime);
    }

    // build query
    if (options.all) {
      query = {start: {$exists: true}};
    } else {
      from = options.from || from || moment().startOf('day');
      to = options.to || to || moment().endOf('day');
      query = {$and: [{start: {$gt: from.toDate()}}, {start: {$lt: to.toDate()}}]};
    }
  }

  if (options.search) {
    var regex = new RegExp(options.search);
    if (!query.$and) {
      query = {$and: [query]};
    }

    var queryableArray = [];
    var fields = Object.keys(this.schema);
    fields.forEach(function (fieldname) {
      if (this.schema[fieldname].queryable) {
        var obj = {};
        obj[fieldname] = {$regex: regex};
        queryableArray.push(obj);
      }
    }, this);

    query.$and.push({$or: queryableArray});
  }

  var db = context.db;
  db.find(query)
    .sort({start: 1})
    .exec(function (err, tasks) {
      if (err) {
        return output(err);
      }

      tasks = tasks.map(function (task) {
        return deserialize(task);
      });

      // output
      output(null, context, tasks);
    });
};

