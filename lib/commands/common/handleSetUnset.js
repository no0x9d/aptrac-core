var preHandleOptions = require('./prehandleOptions');

module.exports = function handleSetUnset(options, method, output) {
    "use strict";
    var context = preHandleOptions(options, this);
    var default_args = Object.keys(context.schema).add("workHours");

    var values = Object.select(context.options, default_args);
    method.call(context.config, values);
    output(null, context)
};