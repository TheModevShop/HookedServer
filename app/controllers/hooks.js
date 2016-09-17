'use strict';

var BluebirdPromise = require('bluebird');
var uuid = require('node-uuid');
var _ = require('lodash');

var bookshelf = require('../../db/bookshelf');
var Hooks = bookshelf.model('hooks');
var Redemptions = bookshelf.model('redemptions');

var knex = require('../../db/knex');
var st = require('knex-postgis')(knex);

var hooks = {};

hooks.getAll = function(q, position) {
  q = q || {};
  const queryObject = {};
  queryObject.coordinates = [
    Number(position.lng),
    Number(position.lat)
  ];

  var point = st.geomFromGeoJSON({
    "type": "Point",
    "coordinates": queryObject.coordinates,
    "crs":{"type":"name","properties":{"name":"EPSG:4326"}}
  });

 return bookshelf.knex('hooks')
  .join('merchants', 'merchants.id', '=', 'hooks.merchant_id')
  .select('hooks.*', 'merchants.polygon', 'merchants.name', st.x(st.centroid('polygon')).as('x'),  st.y(st.centroid('polygon')).as('y'), st.asText('polygon'), st.distance('polygon', point))
  .where(st.dwithin('polygon', point, 100))
};



hooks.getById = function(id, q, position) {
  q = q || {};
  const queryObject = {};
  queryObject.coordinates = [
    Number(position.lng),
    Number(position.lat)
  ];

  var point = st.geomFromGeoJSON({
    "type": "Point",
    "coordinates": queryObject.coordinates,
    "crs":{"type":"name","properties":{"name":"EPSG:4326"}}
  });

  return bookshelf.knex('hooks')
  .join('merchants', 'merchants.id', '=', 'hooks.merchant_id')
  .select('hooks.*', 'merchants.polygon', 'merchants.name', st.x(st.centroid('polygon')).as('x'),  st.y(st.centroid('polygon')).as('y'), st.asText('polygon'), st.distance('polygon', point))
  .andWhere('hooks.id', '=', id)
};




hooks.redeem = function(id, q, position) {
  q = q || {};
  const queryObject = {};
  queryObject.coordinates = [
    Number(position.lng),
    Number(position.lat)
  ];

  var point = st.geomFromGeoJSON({
    "type": "Point",
    "coordinates": queryObject.coordinates,
    "crs":{"type":"name","properties":{"name":"EPSG:4326"}}
  });

 return bookshelf.knex('hooks')
  .join('merchants', 'merchants.id', '=', 'hooks.merchant_id')
  .select('*', st.asText('polygon'))
  .where(st.intersects('polygon', point))
  .andWhere('hooks.id', '=', id).then(function(hook) {
    if (hook && hook[0]) {
      hooks.addRedemption({
        id: hook[0].id,
        user: 1
      })
    } else {
      throw new Error('You must be inside the location to redeem')
    }
  })
};


hooks.add = function(data, trx) { 
  var hook = {
    hook: 'Eat your lunch',
    status: 1,
    photo: 'https://1.bp.blogspot.com/-r31hKr-X2Gg/UYRDZAV_pCI/AAAAAAAABPw/b4LQh7sAMWg/s1600/Subway-Smokehouse-BBQ-Chicken.png',
    merchant_id: 2,
    redemption_code: 'test',
    flights: 'null',
    status: 'null' 
  };
  return new Hooks(hook).save(null, trx);
};


hooks.addRedemption = function(data, trx) { 
  var redemption = {
    user_id: data.user,
    hook_id: data.id
  };
  return new Redemptions(redemption).save(null);
};


module.exports = hooks;

