import { Word } from "../models/models";
import { db } from "../../../db/database";
import { DeleteResult, InsertResult } from "kysely";
export interface WordRepository {
    getWords(languageCode?: string): Promise<Word[]>;
    getWord(id: number): Promise<Word>;
    insertWord(data: WordInsert): Promise<{ insertedRows: string; }>;
    updateWord(data: WordUpdate): Promise<{ updatedRows: string; }>;
    deleteWord(id: number): Promise<{ deletedRowsCount: string; }>;
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
                languageCode: entity.language_code
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
            languageCode: data?.language_code
        };
    },
    insertWord: async (data: WordInsert): Promise<{ insertedRows: string; }> => {
        let query = db.insertInto("word").values({
            word_text: data.text,
            language_code: data.languageCode
        });
        let result: InsertResult = await query.executeTakeFirstOrThrow();
        return { insertedRows: result.numInsertedOrUpdatedRows?.toString() ?? "0" };
    },
    updateWord: async (data: WordUpdate): Promise<{ updatedRows: string; }> => {
        let query = db.updateTable("word")
            .set({
                word_text: data.text,
                language_code: data.languageCode
            })
            .where('word_id', '=', data.id);
        db.updateTable;
        let result = await query.executeTakeFirstOrThrow();
        return { updatedRows: result.numUpdatedRows.toString() };
    },
    deleteWord: async (id: number): Promise<{ deletedRowsCount: string; }> => {
        let query = db.deleteFrom("word").where("word.word_id", "=", id);
        let result: DeleteResult = await query.executeTakeFirstOrThrow();
        return {
            deletedRowsCount: result.numDeletedRows.toString()
        };
    }
};

export function ProvideWordRepository(): WordRepository {
    return WordRepositoryImpl;
};

export type WordInsert = {
    text: string,
    languageCode: string;
};

export type WordUpdate = {
    id: number,
    text: string,
    languageCode: string;
};
