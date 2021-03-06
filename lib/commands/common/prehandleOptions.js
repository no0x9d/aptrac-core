var config = require('../../config');

module.exports = function preHandleOptions(options, aptrac) {
    var context = generateContext(aptrac, options);
    handleAliases(context, options);
    return context;
};

function generateContext(aptrac, options) {
    "use strict";
    var context = {};
    context.options = options;
    context.config = aptrac.config;
    context.schema = aptrac.schema;
    context.db = aptrac.db;
    return context;
}

function handleAliases(context, options) {
    var aliases = context.config.get('alias');
    if (!aliases) return;

    var schema = context.schema;
    for (var fieldName in schema) {
        if (!schema.hasOwnProperty(fieldName))continue;

        var field = schema[fieldName];
        if (field.type === String) {
            var optionValue = options[fieldName];
            if (optionValue) {
                if (Object.isString(optionValue)) {
                    if (optionValue.startsWith('\\')) {
                        options[fieldName] = optionValue.slice(1);
                    }
                    else {
                        var alias = aliases[optionValue];
                        if (alias) {
                            options[fieldName] = alias;
                        } else {
                            // regex search and replace for alias with "{alias}" pattern
                            options[fieldName] = optionValue.replace(/(?:([^\\]|^){(.+?)})/g, function (match, leadingChar, alias) {
                                var aliase = aliases[alias];
                                return aliase ? leadingChar + aliase : leadingChar;
                            });
                            // unescape string with escaped aliases \{alias}
                            options[fieldName] = options[fieldName].replace(/[^\\]{(.+?)}/g, function (match, escapedText) {
                                console.log(escapedText);
                                var aliase = aliases[escapedText];
                                return aliase !== undefined ? aliase : '';
                            });
                        }
                    }
                }
            }
        }
    }
}
