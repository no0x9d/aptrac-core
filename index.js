"use strict";

var program = require('commander');
var init = require('./lib/util/init-db');
var edit = require('./lib/actions/edit');
var end = require('./lib/actions/end');
var create = require('./lib/actions/create');
var findCurrent = require('./lib/actions/findCurrent');
var findLast = require('./lib/actions/findLast');
var moment = require('moment');
var a = require('./lib/util/arguments');
var async = require('async');
var deserialize = require('./lib/util/deserialize');
var chalk = require('chalk');
require('sugar');

function parseTime(dateTime) {
    var time = moment(dateTime, ['HH:mm', 'DD.MM HH:mm', 'DD.MM.YY HH:mm', 'DD.MM.YY'], true);
    if (!time.isValid()) {
        var date = Date.create(dateTime);
        if (!date.isValid()) {
            console.log("can not parse time");
            process.exit(1);
        }
        time = moment(date);
    }
    console.log(time.toDate());
    return time;
}

function outputTaskToConsole(task) {
    console.log("%s - %s  %s  %s",
        task.start.format('HH:mm'),
        task.end ? task.end.format('HH:mm') : '     ',
        moment(task.duration).format('HH:mm'),
        task.task || '');
}

function outputHeader(day) {
    console.log(chalk.blue(moment(new Date(day)).format("dddd, MMMM Do YYYY")));
    console.log(chalk.yellow('Start   End    Dur    Task'));
}
function outputDays(groupedByDay) {
    for (var day in groupedByDay) {
        var duration = 0;
        outputHeader(day);
        var tasks = groupedByDay[day];
        tasks.forEach(function (task) {
            duration += task.duration;

            outputTaskToConsole(task)
        });
        console.log("               %s", moment(duration).format("HH:mm"))
    }
}

program
    .version('1.0.0');

program
    .command('start [task]')
    .alias('s')
    .description('starts a new task')
    .option("-s, --start <time>", "sets the start time (default: now)", parseTime, moment())
    .option("-n, --note <note>", "personal notes")
    .option("-p, --project <project>", "project for task")
    .option("--db <db>", "database connection")
    .action(function (task, options) {
        options.task = task;
        async.waterfall([
            a.bind(this, options),
            findCurrent,
            end,
            create,
            edit,
            findCurrent
        ], function (err, args) {
            if (err) console.log(err);
            else
                outputTaskToConsole(args.task);
        });
    });

program
    .command('edit [task]')
    .alias('ed')
    .description('edits the current active task')
    .option("-s, --start <time>", "sets the start time", parseTime)
    .option("-e, --end <time>", "sets the end time", parseTime)
    .option("-n, --note <note>", "personal notes")
    .option("-p, --project <project>", "project for task")
    .option("--db <db>", "database connection")
    .action(function (task, options) {
        options.task = task;
        async.waterfall([
            a.bind(this, options),
            findCurrent,
            edit,
            findCurrent
        ], function (err, args) {
            if (err) console.log(err);
            else
                outputTaskToConsole(args.task);
        });
    });

program
    .command('end [task]')
    .alias('en')
    .description('ends of the current running task')
    .option('-s, --start <time>', "sets the start time", parseTime)
    .option('-e, --end <time>', "sets the end time (default: now)", parseTime, moment())
    .option('-n, --note <note>', 'personal notes')
    .option('-p, --project <project>', 'project for task')
    .option('--db <db>', 'database connection')
    .action(function (task, options) {
        "use strict";
        options.task = task;
        async.waterfall([
            a.bind(this, options),
            findCurrent,
            edit,
            end
        ], function (err, args) {
            if (err) console.log(err);
            else
                outputTaskToConsole(args.task);
        });
    });

program
    .command('return')
    .alias('r')
    .description('returns to the previous active task')
    .option("-s, --start <time>", "sets the start time (default: now)", parseTime, moment())
    .action(function (options) {
        async.waterfall([
                a.bind(this, options),
                findLast,
                // update changes from found task
                function (args, done) {
                    args.changes.task = args.rerun.task;
                    args.changes.project = args.rerun.project;
                    args.changes.note = args.rerun.note;
                    done(null, args)
                },
                findCurrent,
                end,
                create,
                edit
            ], function (err, args) {
                if (err) console.log(err);
                else
                    outputTaskToConsole(args.task);
            }
        )
    });

program
    .command('list')
    .alias('l')
    .option('-f --from', 'time from which to query (default: today 0:00 am)', parseTime, moment().startOf('day'))
    .option('-t --to', 'time from which to query (default: today 11:59 pm)', parseTime, moment().endOf('day'))
    .option('-y --yesterday', 'show all yesterday entries')
    .option('-w --week', 'show all entries of current week')
    .option('-m --month', 'show all entries of current month')
    .option('-a --all', 'show all entries')
    .option('-c --condense', 'condense all entries with the same task into one')
    .action(function (options) {
        "use strict";

        // handle option flags and set 'from' & 'to'
        if (options.yesterday) {
            options.from = moment().subtract(1, 'day').startOf('day');
            options.to = moment().subtract(1, 'day').endOf('day');
        }
        if (options.week) {
            options.from = moment().startOf('week');
            options.to = moment().endOf('day');
        }
        if (options.month) {
            options.from = moment().startOf('month');
            options.to = moment().endOf('day');
        }

        // build query
        var query;
        if (options.all) {
            query = {start: {$exists: true}};
        } else {
            query = {$and: [{start: {$gt: options.from.toDate()}}, {start: {$lt: options.to.toDate()}}]}
        }

        var db = init(options);
        db.find(query)
            .sort({start: 1})
            .exec(function (err, tasks) {
                if (err) {
                    console.log("could not load tasks");
                    console.log(err);
                    return;
                }

                tasks.forEach(function (task) {
                    deserialize(task);
                });
                var groupedByDay = tasks.groupBy(function (task) {
                    var day = task.start.clone();
                    return day.startOf('day');
                });

                // output
                outputDays(groupedByDay);
            });
    });
program
    .command('now')
    .alias('n')
    .action(function (options) {
        "use strict";

        async.waterfall([
            a.bind(this, options),
            findCurrent
        ], function (err, args) {
            if (err) console.log(err);
            else if (args.task)
                outputTaskToConsole(args.task);
        });
    });

program.parse(process.argv);