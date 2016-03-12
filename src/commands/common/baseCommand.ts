import async            = require('async');
import {preHandleOptions} from './prehandleOptions';

export = function baseCommand(options, asyncActions: Array<Function>, callback) {
    "use strict";
    var context = preHandleOptions(options, this);

    // add our args function bound to the context as first action to
    // get our context in the async waterfall
    asyncActions.unshift(function (done) {
        done(null, context);
    });

    async.waterfall(asyncActions, callback);
};