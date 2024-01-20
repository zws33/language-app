import { Pool } from 'pg';
import * as fs from 'fs';

const caPath = process.env.CA_CERT ? fs.readFileSync(process.env.CA_CERT).toString() : undefined;
export const pool = new Pool({
    max: 20,
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});