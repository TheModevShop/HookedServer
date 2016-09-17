'use strict';

module.exports = function(db) {
  
  var Hooks = db.Model.extend({
    tableName: 'hooks',
    hasTimestamps: true
  });

  return db.model('hooks', Hooks)

}