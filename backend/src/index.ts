import express, { Request, Response, NextFunction, Express } from "express";
import { TranslationRouter } from "./v1/routes/translationRouter";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import { WordRouter } from "./v1/routes/wordRouter";
import { LanguageRouter } from "./v1/routes/languageRouter";

const app: Express = express();
app.use(express.json());
app.use(morgan("dev"));

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

let corsOptions = process.env.NODE_ENV == 'dev' ? devCorsOptions : prodCorsOptions;

app.use(cors(corsOptions));

app.use("/v1/translations", TranslationRouter);
app.use("/v1/words", WordRouter);
app.use("/v1/languages", LanguageRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});