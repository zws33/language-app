import express, { Request, Response, NextFunction, Express } from "express";
import TranslationRouter from "./controllers/translationController";
import cors from "cors";
import { testDbConnection } from "./db/prismaClient";

const app: Express = express();
app.use(express.json());
app.use(cors<Request>());

app.use("/translate", TranslationRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Root route is working!");
});

app.listen(3001, () => {
  console.log("Server listening on port 3000");
});

testDbConnection();