import express, { Request, Response, NextFunction, Express } from "express";
import { connectWithRetry } from "./db/connect";
import { upload, readFile } from "./fileupload/fileupload";
import UserRouter from "./controllers/usercontroller";
import * as Middleware from "./controllers/middleware";

const app: Express = express();
app.use(express.json());
connectWithRetry();

app.post("/upload", Middleware.isLoggedIn, upload.single("file"), async (req, res, next) => {
  const fileContents: any[] = await readFile((req as any).file.path);
  res.json(fileContents);
});

app.use("/user", UserRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Root route is working!");
});

app.listen(3001, () => {
  console.log("Server listening on port 3000");
});
