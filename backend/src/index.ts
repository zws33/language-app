import express, { Request, Response, NextFunction, Express } from "express";
import TranslationRouter from "./controllers/translationController";
import { testDbConnection } from "./db/prismaClient";
import cors, { CorsOptions} from "cors";

const app: Express = express();
app.use(express.json());

const devCorsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
};

const prodCorsOptions: CorsOptions = {
  origin: 'https://zwsmith.com',
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
};

let corsOptions = process.env.NODE_ENV == 'dev' ? devCorsOptions : prodCorsOptions
app.use(cors(corsOptions));

app.use("/translate", TranslationRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Root route is working!");
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

testDbConnection();