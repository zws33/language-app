import { Pool } from 'pg';

const pool = new Pool({
  max: 20,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
export default pool;
