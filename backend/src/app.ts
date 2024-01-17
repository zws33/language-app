import express, { Request, Response, NextFunction, Express } from "express";
import { TranslationRouter } from "./v1/routes/translationRouter";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import { WordRouter } from "./v1/routes/wordRouter";
import { LanguageRouter } from "./v1/routes/languageRouter";

export function App(corsOptions: CorsOptions) {
    const app: Express = express();
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(cors(corsOptions));
    app.use("/v1/translations", TranslationRouter);
    app.use("/v1/words", WordRouter);
    app.use("/v1/languages", LanguageRouter);
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        res.send("Hello World!");
    });
    return app;
}
