var knex = require('../db/knex');
var st = require('knex-postgis')(knex);
var moment = require('moment');
var merchants;

exports.seed = function(knex, Promise) {
    return Promise.resolve()
};
