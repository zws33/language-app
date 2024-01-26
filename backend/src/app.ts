import express, { json } from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import wordRouter from './v1/routes/wordRouter.js';
import languageRouter from './v1/routes/languageRouter.js';
import { translationRouter } from './v1/routes/translationRouter.js';

export function createApp(corsOptions: CorsOptions) {
  const app = express();
  app.use(json());
  app.use(morgan('dev'));
  app.use(cors(corsOptions));
  app.use('/v1/words', wordRouter);
  app.use('/v1/languages', languageRouter);
  app.use('/v1/translations', translationRouter);
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  return app;
}
