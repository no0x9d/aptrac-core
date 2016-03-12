var defaultSchema = require('./defaultSchema'),
    Schema        = require('./schema');

export = {
  schema: function () {
    var schema = new Schema();
    schema.extend(defaultSchema);
    return schema;
  }
};
