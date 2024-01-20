import { Request, Response } from "express";
import * as repository from '../data/repositories/wordRepository'

export class WordController {
    getWords = async (req: Request, res: Response) => {
        let words = await repository.getWords();
        res.json(words);
    };

    getWord = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                res.status(400).send("Error: Bad Request");
            }
            let word = await repository.getWord(id);
            res.json(word);
        } catch (error) {
            res.status(500).send("Error getting word");
        }
    };

    addWord = async (req: Request, res: Response) => {
        const { body } = req;
        if (!body.text || !body.languageCode) {
            res.status(400).send("Error: Bad Request");
        }
        try {
            const insertData = {
                text: body.text,
                languageCode: body.languageCode
            };
            let result = await repository.insertWord(insertData);
            res.status(200).json({
                message: "Insert succeeded",
                result: result
            });
        } catch (error) {
            res.status(500).send("Error adding word to db.");
        }
    };

    updateWord = async (req: Request, res: Response) => {
        const { body, params } = req;
        if (!params.id || !body.text || !body.languageCode) {
            res.status(400).send("Error: Bad Request");
        }
        try {
            const updateData = {
                id: parseInt(params.id),
                text: body.text,
                languageCode: body.languageCode
            };
            let result = await repository.updateWord(updateData);
            res.status(200).json({
                message: "Update succeeded",
                result: result
            });
        } catch (error) {
            res.status(500).send("Error adding word to db.");
        }
    };
    
    deleteWord = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (!id) {
            res.status(400).send("Error: Bad Request");
        }
        try {
            let result = await repository.deleteWord(id);
            res.status(200).json({
                message: "Update succeeded",
                result: result
            });
        } catch (error) {
            res.status(500).send("Error adding word to db.");
        }
    };
};
