import { Kysely, PostgresDialect, Selectable } from 'kysely';
import { DB, Word as dbWord } from 'kysely-codegen';
import pool from './dbconfig.js';

export async function testDbConnection(): Promise<'success' | 'failure'> {
  const res = await pool.query('SELECT NOW()');
  return res.rows.length > 0 ? 'success' : 'failure';
}

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<DB>({
  dialect,
});

export type Word = Selectable<dbWord>;
