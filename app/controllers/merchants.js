'use strict';

var BluebirdPromise = require('bluebird');
var uuid = require('node-uuid');
var _ = require('lodash');

var bookshelf = require('../../db/bookshelf');
var knex = require('../../db/knex');
var st = require('knex-postgis')(knex);

var Merchants = bookshelf.model('merchants');

var merchants = {};

merchants.getAll = function(queryObject) {
  return Merchants.fetchAll({
    // withRelated: ['service', 'user'],
  })
};

merchants.getById = function(id) {
  return Merchants.where('id', id).fetch({})
  //   .limit(limit || 10)
  //   .skip(offset || 0)
};

merchants.updateById = function(id, params) {
  var updatedObj = {};
  return bookshelf.knex('merchants')
  .where('id', '=', id)
  .update(updatedObj)
};


merchants.add = function(data, trx) { 
  var polygon = st.geomFromGeoJSON({
    "type": "Polygon",
    "coordinates": [
      [
        [
          -97.75841027498245,
          30.291547627541817
        ],
        [
          -97.75823324918747,
          30.29150362340013
        ],
        [
          -97.75824129581451,
          30.29146656726551
        ],
        [
          -97.7581313252449,
          30.291450355202215
        ],
        [
          -97.75809377431868,
          30.29157773562739
        ],
        [
          -97.75837808847427,
          30.291640267775577
        ],
        [
          -97.75841027498245,
          30.291547627541817
        ]
      ]
    ],
    "crs":{"type":"name","properties":{"name":"EPSG:4326"}}
  });


  var m = {  
    name: 'name',
    location_id: 1,
    primary_contact: 1,
    email: 'two@gmail.com',
    polygon: polygon,

    street_address: '2400 Jarratt',
    city: 'Austin',
    state: 'Tx',
    zipcode: 78703,
    phone: '440-478-5404',
    website: 'google.com',
    description: {
      "other_offers": [
        {
          "offer": "test offer"
        }
      ]
    }  
  };


  return new Merchants(m).save(null);
};




module.exports = merchants;
