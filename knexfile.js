require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/hooked_app'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
    }
};
