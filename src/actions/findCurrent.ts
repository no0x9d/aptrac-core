import {findOne} from './findOne';

export function findCurrentTask(args, done) {
  var search = {end: {$exists: false}};

  findOne(args, search, done);
}