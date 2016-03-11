var copyOptions = function (context, copyBase, useDefaults) {
    "use strict";

    var options = context.options,
        config  = context.config,
        schema = context.schema,
        args;

    args = Object.keys(schema);
    args.forEach(function (option) {
        if (options[option])
            copyBase[option] = options[option];
        else if (useDefaults && config.get(option))
            copyBase[option] = config.get(option);
    });

    return copyBase;
};

function generateChanges(context, useDefaults, done) {
    context.changes = copyOptions(context, {}, useDefaults);
    done(null, context);
}

export = generateChanges;