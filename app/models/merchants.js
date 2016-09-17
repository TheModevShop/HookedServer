'use strict';

module.exports = function(db) {
  var Merchants = db.Model.extend({
    tableName: 'merchants',
    // hasTimestamps: true
  });
  return db.model('merchants', Merchants)
}