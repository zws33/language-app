import { Application } from 'express';
import { CorsOptions } from 'cors';
import { testDbConnection } from './db/database.js';
import App from './app.js';

const devCorsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true,
};

const prodCorsOptions: CorsOptions = {
  origin: 'https://zwsmith.com',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true,
};

const { NODE_ENV } = process.env;
const corsOptions =
  NODE_ENV === 'development' ? devCorsOptions : prodCorsOptions;
const app: Application = App(corsOptions);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  testDbConnection();
});
