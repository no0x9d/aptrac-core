var defaultSchema = require('./defaultSchema'),
    Schema        = require('./schema');

module.exports = {
    schema: function(){
        var schema = new Schema();
        schema.extend(defaultSchema);
        return schema;
    }
};