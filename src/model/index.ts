import defaultSchema from './defaultSchema';
import {Schema} from './schema';

export = {
  schema: function () {
    var schema = new Schema();
    schema.extend(defaultSchema);
    return schema;
  }
};
