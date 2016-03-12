import moment = require('moment');

moment.duration.prototype.clone = function(){
    return moment.duration(this);
};