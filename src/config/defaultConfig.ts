var osenv = require('osenv');
import * as path from 'path';

var home = path.join(osenv.home(), ".aptrac");
var db = path.join(home, 'tasks.db');


export default {
  userhome: osenv.home(),
  home: home,
  db: db,
  workHours: 8
};
