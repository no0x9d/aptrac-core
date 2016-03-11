import findOne = require('./findOne');

export = function findById(args, done) {
    var search = {_id: args.options.id};

    findOne(args, search, done);
};
