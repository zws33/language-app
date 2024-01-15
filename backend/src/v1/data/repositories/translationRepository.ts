import { Translation } from "../models/models";


interface TranslationRepository {
    getTranslations(filterParams: {}): Translation[];
    getTranslation(id: string): Translation;
    addTranslation(translation: Translation): void;
    updateTranslation(translation: Translation): void;
    deleteTranslation(id: string): void;
};

const TranslationRepositoryImpl: TranslationRepository = {
    getTranslations: function (filterParams: {}): Translation[] {
        throw new Error("Function not implemented.");
    },
    getTranslation: function (id: string): Translation {
        throw new Error("Function not implemented.");
    },
    addTranslation: function (translation: Translation): void {
        throw new Error("Function not implemented.");
    },
    updateTranslation: function (translation: Translation): void {
        throw new Error("Function not implemented.");
    },
    deleteTranslation: function (id: string): void {
        throw new Error("Function not implemented.");
    }
};

export function TranslationRepository(): TranslationRepository {
    return TranslationRepositoryImpl;
};