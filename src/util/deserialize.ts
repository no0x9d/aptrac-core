import moment = require('moment');

function Task(task) {
    if (!task) return;

    var x;
    for (x in task) {
        if (task.hasOwnProperty(x)) {
            if (task[x] instanceof Date){
                this[x] = moment(task[x]);
            }
            else
                this[x] = task[x];
        }
    }
}

Object.defineProperty(Task.prototype, "duration", {
        get: function () {
            var end = this.end || moment();
            return moment.duration(end.diff(this.start));
        }
    }
);

export = function deserializeTask(task) {
    return new Task(task);
};
