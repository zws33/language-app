import { Router, Request, Response } from "express";
const TranslationRouter = Router();
TranslationRouter.post("/", async (req: Request, res: Response) => {
    let text = req.query.text as string;
    let targetLanguage = req.query.target_lang as string;
    const apiUrl = process.env.TRANSLATION_SERVICE_URL as string;
    const queryParams = {
        text: text,
        target_lang: targetLanguage,
    };

    const queryString = new URLSearchParams(queryParams).toString();
    const fullUrl = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
    }
})
export default TranslationRouter