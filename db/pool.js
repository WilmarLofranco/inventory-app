const { Pool } = require('pg');
require('dotenv').config();

const connectionString =  process.env.DATABASE_URL_PROD

module.exports = new Pool ({
    connectionString,
    ssl: {rejectUnauthorized: false},
})
