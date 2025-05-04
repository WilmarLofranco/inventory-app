const {Client} = require('pg');
require('dotenv').config();

const createSQLtable = `CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    item TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL
    )`;
    
const insertItems = `INSERT INTO inventory (item, category, quantity, price)
    VALUES
  -- Electronics
  ('Apple iPhone 13', 'electronics', 5, 999.00),
  ('Samsung Galaxy S21', 'electronics', 6, 899.00),
  ('Sony WH-1000XM4 Headphones', 'electronics', 12, 349.99),
  ('Canon EOS R10 Camera', 'electronics', 3, 999.00),
  ('Nikon Z50 Mirrorless', 'electronics', 2, 899.99),
  
  -- Accessories
  ('Logitech MX Master 3 Mouse', 'accessories', 20, 99.99),
  ('Razer BlackWidow V3 Keyboard', 'accessories', 10, 139.00),
  ('Anker PowerCore 10000 Power Bank', 'accessories', 15, 49.99),
  ('Samsung T7 Portable SSD 1TB', 'accessories', 8, 129.99),
  ('Belkin USB-C Hub 7-in-1', 'accessories', 12, 59.99),
  
  -- Furniture
  ('IKEA Markus Office Chair', 'furniture', 5, 229.00),
  ('Autonomous SmartDesk Core', 'furniture', 4, 399.00),
  ('FlexiSpot Standing Desk Converter', 'furniture', 6, 189.99),
  ('Herman Miller Aeron Chair', 'furniture', 2, 1395.00),
  ('Sauder Harbor View Bookcase', 'furniture', 3, 159.99),
  
  -- Office Supplies
  ('Staples Copy Paper 10 Ream Case', 'office supplies', 25, 49.99),
  ('Brother HL-L2390DW Laser Printer', 'office supplies', 4, 169.00),
  ('Swingline 747 Classic Stapler', 'office supplies', 10, 18.99),
  ('3M Post-it Notes 12 Pack', 'office supplies', 30, 14.99),
  ('Pilot G2 Gel Pens 20 Pack', 'office supplies', 15, 19.99);
    `;

    async function main() {
        try {
            const environment = process.env.NODE_ENV || 'development';
            const connectionString = environment === 'production' 
            ? process.env.DATABASE_URL_PROD
            : process.env.DATABASE_URL_LOCAL;   

            const client = new Client({
                connectionString,
                ssl: environment === 'production' ? {rejectUnauthorized: false} : false
            })    
            await client.connect();
            await client.query(createSQLtable);

            console.log('Clearing old data...');
            await client.query('DELETE FROM inventory');
            await client.query('ALTER SEQUENCE inventory_id_seq RESTART WITH 1');
            
            console.log('seeding...');
            await client.query(insertItems);

            await client.end();
            console.log('done');
        } catch (error) {
            console.error('Error seeding database:', error)
        }
    }

    main();