const { Pool } = require('pg');
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const connectionString = environment === 'production' 
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL_LOCAL;

module.exports = new Pool ({
    connectionString,
    ssl: environment === 'production' ? {rejectUnauthorized: false} : false,
})
