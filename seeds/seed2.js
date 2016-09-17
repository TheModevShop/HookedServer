var knex = require('../db/knex');
var st = require('knex-postgis')(knex);
var moment = require('moment');
var merchants;
var user;

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('locations').del(),
        knex('merchants').del(),
        knex('users').del(),
        knex('hooks').del(),
        knex('redemptions').del()
    )

    .then(function() {
        return Promise.join(
            knex('users').insert({
              first_name: 'Vinces',
              last_name: 'Profeta',
              email: 'vprofeta12@gmail.com',
              phone: '444-444-4444',
              password: 'd',
              avatar: 'TODO',
            }).returning('id')
        );
    })
    
    .then(function(ids) {
        user = ids[0][0];
        return Promise.join(
            knex('locations').insert({
              status: 'live',
              name: 'UT Austin',
              city: 'Austin',
              state: 'Tx'
            }).returning('id')
        );
    })



    .then(function(ids) {
        var loc = ids[0][0];
        var polygon = st.geomFromGeoJSON({
          "type": "Polygon",
          "coordinates": [
            [
            [
              -97.80524969100951,
              30.24547375247353
            ],
            [
              -97.80461132526398,
              30.24632180526058
            ],
            [
              -97.8038415312767,
              30.245927901870836
            ],
            [
              -97.80417948961258,
              30.245476069567612
            ],
            [
              -97.80450135469437,
              30.245652168558518
            ],
            [
              -97.80489832162857,
              30.24518643238305
            ],
            [
              -97.80524969100951,
              30.24547375247353
            ]
          ]
          ],
          "crs":{"type":"name","properties":{"name":"EPSG:4326"}}
        });

        return Promise.join(
            knex('merchants').insert({
              name: 'name',
              location_id: loc,
              primary_contact: user,
              email: 'merchant@gmail.com',
              polygon: polygon,

              street_address: '22 S Mopac',
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
            }).returning('id')
        );
    })

    .then(function(ids) {
        merchants = ids[0][0];
        return Promise.join(
            knex('hooks').insert({
              hook: 'Half off anything taco related',
              status: 1,
              photo: 'https://dccwebstorage.blob.core.windows.net/media/Default/images/beef_brisket_tacos.jpg',
              merchant_id: merchants,
              redemption_code: 'test',
              flights: 'null',
              status: 'null'
            }).returning('id')
        );
    })

};
