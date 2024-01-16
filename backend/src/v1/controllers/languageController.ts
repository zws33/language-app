import { Request, Response } from "express";
import { LanguageRepository } from "../data/repositories/languageRepository";

interface LanguageController {
    getLanguages: (req: Request, res: Response) => void;
    addLanguage: (req: Request, res: Response) => void;
    updateLanguage: (req: Request, res: Response) => void;
    deleteLanguage: (req: Request, res: Response) => void;
};

export function LanguageController(): LanguageController {
    return LanguageControllerImpl;
}

const LanguageControllerImpl: LanguageController = {
    getLanguages: function (req: Request, res: Response): void {
        res.send("Get all languages");
    },
    addLanguage: function (req: Request, res: Response): void {
        res.send("Add a new language");
    },
    updateLanguage: function (req: Request, res: Response): void {
        res.send("Update an existing language");
    },
    deleteLanguage: function (req: Request, res: Response): void {
        res.send("Delete an existing language");
    }
};
