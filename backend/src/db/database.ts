import { Kysely, PostgresDialect } from 'kysely';
import { DB } from 'kysely-codegen';
import pool from './dbconfig.js';

export const testDbConnection = () => {
  pool
    .query('SELECT NOW()')
    .then((res) => {
      if (res.rows.length > 0) {
        console.log('DB connection succeeded.');
      } else {
        throw Error('DB connection failed.');
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<DB>({
  dialect,
});
