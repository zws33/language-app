import { Request, Response } from "express";

interface WordController {
    getWords: (req: Request, res: Response) => void;
    getWord: (req: Request, res: Response) => void;
    addWord: (req: Request, res: Response) => void;
    updateWord: (req: Request, res: Response) => void;
    deleteWord: (req: Request, res: Response) => void;
};

export function WordController(): WordController {
    return WordControllerImpl;
}

const WordControllerImpl: WordController = {
    getWords: function (req: Request, res: Response): void {
        res.send("Get all words");
    },
    getWord: function (req: Request, res: Response): void {
        res.send("Get word by ID");
    },
    addWord: function (req: Request, res: Response): void {
        res.send("Add a new word");
    },
    updateWord: function (req: Request, res: Response): void {
        res.send("Update an existing word");
    },
    deleteWord: function (req: Request, res: Response): void {
        res.send("Delete an existing word");
    }
};
