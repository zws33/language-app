import { Pool } from 'pg';

export const pool = new Pool({
    max: 20,
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});