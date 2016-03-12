var findOne = require('./findOne');

export = function findCurrentTask(args, done) {
    var search = {end: {$exists: false}};

    findOne(args, search, done);
};
