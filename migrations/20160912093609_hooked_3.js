exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email').notNullable().unique();
      table.string('phone')
      table.string('password').notNullable()
      table.string('avatar')
      table.timestamp('delete_date')
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      table.jsonb('facebook_credentials') //REMOVE
      table.string('facebook_user_id') //REMOVE
    }),

    
    // ________________________________________________________

  
    knex.schema.createTable('locations', function(table){
      table.increments();
      table.string('status').defaultTo(false);
      table.string('name').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();

      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    }),

    // ________________________________________________________

    knex.schema.createTable('merchants', function(table){
      table.increments();
      table.string('name').notNullable()
      table.integer('location_id').references('locations.id').notNullable();
      table.integer('primary_contact').references('users.id').notNullable();
      table.string('email').notNullable(),
      // table.specificType('point', 'geometry(point, 4326)').notNullable().unique();
      table.specificType('polygon', 'geometry(Polygon, 4326)').notNullable().unique();
      // table.specificType('coordinates', 'GEOGRAPHY(Point, 4326)');

      // st.geomFromText(`Point(${m.coordinates.longitude} ${m.coordinates.latitude})`, 4326);
      // st.geomFromGeoJSON('{"type": "Point", "coordinates": [-48.23456,20.12345]}')
    }),

    // ________________________________________________________

    knex.schema.createTable('hooks', function(table){
      table.increments();
      table.string('name').notNullable();
      table.integer('merchant_id').references('merchants.id').notNullable();
      
      table.string('redemption_code').notNullable();
      table.string('flights').notNullable();

      table.string('status').notNullable();

      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    }),

    // ________________________________________________________

    knex.schema.createTable('redemptions', function(table){
      table.increments();
      table.integer('user_id').references('users.id').notNullable();
      table.integer('hook_id').references('hooks.id').notNullable();

      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })

  ])

};

exports.down = function(knex, Promise) {
  
};




// table.string('resourceName').notNullable();
//       table.integer('app_fee_percentage_take').defaultTo(0);
//       table.integer('app_fee_flat_fee_take').defaultTo(100);
//       table.integer('booking_percent_take').defaultTo(0);
//       table.integer('booking_flat_fee_take').defaultTo(0);
//       table.string('description', 500);
//       table.specificType('point', 'geometry(point, 4326)').notNullable().unique();
//       table.integer('cancellation_policy_percent_take').defaultTo(0).notNullable();
//       table.integer('cancellation_policy_flat_fee_take').defaultTo(0).notNullable();
//       table.integer('cancellation_policy_window').defaultTo(0);
//       table.string('street_address').notNullable().unique();
//       table.string('city').notNullable();
//       table.string('state').notNullable();
//       table.integer('zipcode').notNullable();
//       table.string('phone').notNullable();
//       table.string('email').notNullable();
//       table.string('website').notNullable();
//       table.string('timezone').notNullable();
//       table.boolean('require_membership').defaultTo(false);
//       table.timestamp('delete_date')
//       table.timestamps()