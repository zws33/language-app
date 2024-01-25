import { Application } from 'express';
import { CorsOptions } from 'cors';
import { testDbConnection } from './db/database.js';
import { createApp } from './app.js';

const prodCorsOptions: CorsOptions = {
  origin: 'https://zwsmith.com',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true,
};

const devCorsOptions = { ...prodCorsOptions, origin: '*' };

const { NODE_ENV } = process.env;
const corsOptions = NODE_ENV === 'development' ? devCorsOptions : prodCorsOptions;
const app: Application = createApp(corsOptions);
const port = process.env.PORT;
testDbConnection().then((connection) => {
  if (connection === 'success') {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } else {
    throw Error('Could not connect to database');
  }
});
