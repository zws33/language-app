
import { Language } from "../models/models";


interface LanguageRepository {
    getLanguages(): Promise<Language[]>;
    addLanguage(language: Language): Promise<void>;
    updateLanguage(language: Language): Promise<void>;
    deleteLanguage(id: string): Promise<void>;
};

const LanguageRepositoryImpl: LanguageRepository = {
    getLanguages: async function (): Promise<Language[]> {
        throw new Error("Function not implemented.");
    },
    addLanguage: function (language: Language): Promise<void> {
        throw new Error("Function not implemented.");
    },
    updateLanguage: function (language: Language): Promise<void> {
        throw new Error("Function not implemented.");
    },
    deleteLanguage: function (id: string): Promise<void> {
        throw new Error("Function not implemented.");
    }
};

export function LanguageRepository(): LanguageRepository {
    return LanguageRepositoryImpl;
};