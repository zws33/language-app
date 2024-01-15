export type Translation = {
    id: string,
    sourceWord: Word,
    targetWord: Word;
};

export type Word = {
    id: string;
    text: string,
    language: Language;
};

export type Language = {
    id: string,
    displayText: string;
};