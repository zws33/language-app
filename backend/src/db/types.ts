import {
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely';

export interface Database {
    word: WordTable;
    language: LanguageTable;
}

export interface WordTable {
    word_id: Generated<number>;
    word_text: string;
    language_code: string;
}
export interface LanguageTable {
    language_code: string;
}

export type Word = Selectable<WordTable>;
export type WordInsert = Insertable<WordTable>;
export type WordUpdate = Updateable<WordTable>;

export type Language = Selectable<LanguageTable>;