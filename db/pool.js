const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: 'caboose.proxy.rlwy.net',
    port: 27826,
    user: 'postgres',
    password: 'CBEEzuXsSerSuVIFgVesaLFIqSMNnFxr',
    database: 'railway',
    ssl: { rejectUnauthorized: false },
});

module.exports = pool;
