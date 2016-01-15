function Schema() {
}

Schema.prototype.extend = function (schema) {
    function checkForValidType(type) {
        if (!type) {
            throw new Error("Schema field definition must have a type:" + propName);
        }
        else if (!(type === String || type === Date || type === Number || Boolean)) {
            throw new Error("Datatype" + type + " for field definition must have a type:" + propName);
        }
    }

    for (var propName in schema) {
        if (schema.hasOwnProperty(propName)) {
            var prop = schema[propName];

            checkForValidType(prop.type);

            if (!this[propName]) {
                this[propName] = {
                    type: prop.type,
                    label: prop.label,
                    queryable: prop.queryable,
                    required: prop.required
                }
            }

        }
    }
};

module.exports = Schema;