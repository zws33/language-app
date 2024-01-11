import { Router, Request, Response } from "express";
const TranslationRouter = Router();
TranslationRouter.post("/", async (req: Request, res: Response) => {
    let text = req.query.text as string;
    let targetLanguage = req.query.target_lang as string;
    const baseUrl = process.env.TRANSLATION_SERVICE_URL as string;
    const queryString = new URLSearchParams({
        text: text,
        target_lang: targetLanguage,
    }).toString();
    const fullUrl = `${baseUrl}?${queryString}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'https://zwsmith.com'
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