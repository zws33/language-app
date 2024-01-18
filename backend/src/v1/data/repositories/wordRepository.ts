import { Word } from "../models/models";
import { db } from "../../../db/database";
import { InsertResult } from "kysely";
export interface WordRepository {
    getWords(languageCode?: string): Promise<Word[]>;
    getWord(id: number): Promise<Word>;
    insertWord(data: InsertWordData): Promise<{ id: number; }>;
    updateWord(word: Word): Promise<void>;
    deleteWord(id: number): Promise<void>;
};

const WordRepositoryImpl: WordRepository = {
    getWords: async (languageCode: string): Promise<Word[]> => {
        let query = db.selectFrom("word").selectAll();
        if (languageCode) {
            query.where("language_code", "=", languageCode);
        }
        let result = await query.execute();
        return result.map((entity) => {
            return {
                id: entity.word_id,
                text: entity.word_text,
                language: { code: entity.language_code }
            };
        });
    },
    getWord: async (id: number): Promise<Word> => {
        let data = await db.selectFrom("word")
            .selectAll()
            .where("word.word_id", "=", id)
            .executeTakeFirstOrThrow();

        return {
            id: data?.word_id,
            text: data?.word_text,
            language: { code: data?.language_code }
        };
    },
    insertWord: async (data: InsertWordData): Promise<{ id: number; }> => {
        let query = db.insertInto("word").values({
            word_text: data.text,
            language_code: data.languageCode
        });
        let result = await query.returning("word_id").executeTakeFirstOrThrow();
        return { id: result.word_id };
    },
    updateWord: async (word: Word): Promise<void> => {
        throw new Error("Function not implemented.");
    },
    deleteWord: async (id: number): Promise<void> => {
        throw new Error("Function not implemented.");
    }
};

export function ProvideWordRepository(): WordRepository {
    return WordRepositoryImpl;
};

export type InsertWordData = {
    text: string,
    languageCode: string;
};
