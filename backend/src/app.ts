import express, { Request, Response, Application, json } from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import wordRouter from './v1/routes/wordRouter.js';

const App: (corsOptions: CorsOptions) => Application = (corsOptions) => {
  const app = express();
  app.use(json());
  app.use(morgan('dev'));
  app.use(cors(corsOptions));
  app.use('/v1/words', wordRouter);
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });
  return app;
};
export default App;
