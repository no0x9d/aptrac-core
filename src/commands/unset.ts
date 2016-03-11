import handleSetUnset = require('./common/handleSetUnset');

export = function unset(options, output) {
    handleSetUnset.call(this, options, this.config.unset.bind(this.config), output);
};