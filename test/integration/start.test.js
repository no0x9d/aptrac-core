var expect = require('chai').expect;
var moment = require('moment');

var Aptrac = require('../../src/aptrac');
describe('start command', function () {
    it('should create a new entry in db', function (done) {
        var now = moment();
        var name = 'mocha test';

        var options = {
            db: null,
            start: now,
            task: name
        };
        var aptrac = new Aptrac(options, {task: {type: String}});

        aptrac.start(options, function (err, context, task) {
            expect(err).to.be.null;
            expect(now.isSame(task.start)).to.be.true;
            expect(task._id).to.equal(1);
            expect(task.task).to.equal(name);
            done()
        });
    });

    it('should should throw if no start date is provided', function (done) {
        var aptrac = new Aptrac();
        var options = {
            db: null,
            start: undefined,
            task: 'mocha test'
        };

        aptrac.start(options, function (err) {
            expect(err).to.not.be.null;
            done()
        });
    });

    it('should end a current running task', function (done) {
        var now = moment();
        var oldStart = moment().subtract(1, 'hour').toDate();
        var name = 'mocha test';

        var options = {
            db: null,
            start: now,
            task: name
        };
        var aptrac = new Aptrac(options);
        var db = aptrac.db;

        var id = 1;
        db.insert({_id: id, start: oldStart}, function (err, newObj) {
            if (err) done(err);

            expect(newObj.start).to.eql(oldStart);
            expect(newObj.end).to.be.undefined;

            aptrac.start(options, function (err) {
                if (err) done(err);

                db.findOne({_id: id}, function (err, task) {
                    expect(now.isSame(task.end)).to.be.true;
                    done(err)
                })
            })
        });

    })
});