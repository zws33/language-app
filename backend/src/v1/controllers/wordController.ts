import { Request, Response } from "express";
import { ProvideWordRepository, WordRepository } from "../data/repositories/wordRepository";

export interface WordController {
    getWords: (req: Request, res: Response) => Promise<void>;
    getWord: (req: Request, res: Response) => Promise<void>;
    addWord: (req: Request, res: Response) => Promise<void>;
    updateWord: (req: Request, res: Response) => Promise<void>;
    deleteWord: (req: Request, res: Response) => Promise<void>;
};

export function ProvideWordController(): WordController {
    return new WordControllerImpl(ProvideWordRepository());
}

class WordControllerImpl implements WordController {

    repository: WordRepository = ProvideWordRepository();
    constructor(repository: WordRepository) {
        this.repository = repository;
    }

    getWords = async (req: Request, res: Response) => {
        let words = await this.repository.getWords();
        res.json(words);
    };
    getWord = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                res.status(400).send("Error: Bad Request");
            }
            let word = await this.repository.getWord(id);
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
            let result = await this.repository.insertWord(insertData);
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
            let result = await this.repository.updateWord(updateData);
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
            let result = await this.repository.deleteWord(id);
            res.status(200).json({
                message: "Update succeeded",
                result: result
            });
        } catch (error) {
            res.status(500).send("Error adding word to db.");
        }
    };
};
