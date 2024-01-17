import { Pool } from 'pg';


const DB_PORT = process.env.DB_PORT;
export const pool = new Pool({
    max: 20,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: DB_PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: false,
    }
});