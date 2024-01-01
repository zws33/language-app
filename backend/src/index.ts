import express, { Request, Response, NextFunction, Express } from "express";
import { connectWithRetry } from "./db/connect";
import UserRouter from "./controllers/usercontroller";
import TranslationRouter from "./fileupload/translationcontroller";

const app: Express = express();
app.use(express.json());
connectWithRetry();

app.use("/user", UserRouter);
app.use("/translate", TranslationRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Root route is working!");
});

app.listen(3001, () => {
  console.log("Server listening on port 3000");
});
