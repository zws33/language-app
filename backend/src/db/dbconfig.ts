import { Pool } from 'pg';
import * as fs from 'fs';

export const pool = new Pool({
    max: 20,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: process.env.NODE_ENV == 'production',
        ca: fs.readFileSync(process.env.CA_CERT).toString()
    }
});