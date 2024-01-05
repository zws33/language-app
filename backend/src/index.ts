import express, { Request, Response, NextFunction, Express } from "express";
import { connectWithRetry } from "./db/connect";
import UserRouter from "./controllers/userController";
import TranslationRouter from "./controllers/translationController";
import cors from "cors";

const app: Express = express();
app.use(express.json());
connectWithRetry();
app.use(cors<Request>());

app.use("/user", UserRouter);
app.use("/translate", TranslationRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Root route is working!");
});

app.listen(3001, () => {
  console.log("Server listening on port 3000");
});