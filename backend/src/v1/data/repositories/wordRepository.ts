import { Word } from "../models/models";

interface WordRepository {
    getWords(filterParams: {}): Word[];
    getWord(id: string): Word;
    addWord(data: AddWordData): void;
    updateWord(word: Word): void;
    deleteWord(id: string): void;
};

const WordRepositoryImpl: WordRepository = {
    getWords: function (filterParams: {}): Word[] {
        throw new Error("Function not implemented.");
    },
    getWord: function (id: string): Word {
        throw new Error("Function not implemented.");
    },
    addWord: function (data: AddWordData): void {
        throw new Error("Function not implemented.");
    },
    updateWord: function (word: Word): void {
        throw new Error("Function not implemented.");
    },
    deleteWord: function (id: string): void {
        throw new Error("Function not implemented.");
    }
};

export function WordRepository(): WordRepository {
    return WordRepositoryImpl;
};

export type AddWordData = {
    text: string,
    languageCode: string;
};