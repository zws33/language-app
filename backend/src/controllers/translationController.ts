import { Router, Request, Response } from "express";
import { fetchTranslation } from "./fetchTranslation";

const TranslationRouter = Router();

TranslationRouter.post("/", async (req: Request, res: Response) => {
    let text = req.query.text as string;
    let targetLanguage = req.query.target_lang as string;
    try {
        let data = await fetchTranslation(text, targetLanguage);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

export default TranslationRouter