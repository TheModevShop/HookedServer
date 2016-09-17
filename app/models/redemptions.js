'use strict';

module.exports = function(db) {
  var Redemptions = db.Model.extend({
    tableName: 'redemptions',
    hasTimestamps: true
  });
  return db.model('redemptions', Redemptions)
}