export type Translation = {
    id: string,
    sourceWord: Word,
    targetWord: Word;
};

export type Word = {
    id: number;
    text: string,
    language: Language;
};

export type Language = {
    code: string;
};