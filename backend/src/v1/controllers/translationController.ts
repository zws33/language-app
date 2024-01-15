import { Request, Response } from "express";

interface TranslationController {
    getTranslations: (req: Request, res: Response) => void;
    getTranslation: (req: Request, res: Response) => void;
    addTranslation: (req: Request, res: Response) => void;
    updateTranslation: (req: Request, res: Response) => void;
    deleteTranslation: (req: Request, res: Response) => void;
};

export function TranslationController(): TranslationController {
    return TranslationControllerImpl;
}

const TranslationControllerImpl: TranslationController = {
    getTranslations: function (req: Request, res: Response): void {
        res.send("Get all translations");
    },
    getTranslation: function (req: Request, res: Response): void {
        res.send("Get translation by ID");
    },
    addTranslation: function (req: Request, res: Response): void {
        res.send("Add a new translation");
    },
    updateTranslation: function (req: Request, res: Response): void {
        res.send("Update an existing translation");
    },
    deleteTranslation: function (req: Request, res: Response): void {
        res.send("Delete an existing translation");
    }
};
