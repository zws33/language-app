import { db } from '../../../db/database.js';

type Word = {
	language_code: string;
	word_id: number;
	word_text: string;
};

type InsertData = {
	text: string;
	languageCode: string;
};

type UpdateData = {
	id: number;
	text: string;
	languageCode: string;
};

type GetWords = (languageCode?: string) => Promise<Word[]>;
type GetWord = (id: number) => Promise<Word>;
type InsertWord = (data: InsertData) => Promise<{ insertedRows: string }>;
type UpdateWord = (data: UpdateData) => Promise<{ updatedRows: string }>;
type DeleteWord = (id: number) => Promise<{ deletedRowsCount: string }>;

export const getWords: GetWords = async (languageCode) => {
	const query = db
		.selectFrom('word')
		.selectAll()
		.$if(languageCode !== undefined, (builder) =>
			builder.where('word.language_code', '=', languageCode!),
		);

	try {
		const result: Word[] = await query.execute();
		return result;
	} catch (error) {
		if (typeof error === 'string') {
			throw new Error(error);
		} else if (error instanceof Error) {
			throw new Error(error.message);
		}
		return [];
	}
};

export const getWord: GetWord = async (id) => {
	const data = await db
		.selectFrom('word')
		.selectAll()
		.where('word.word_id', '=', id)
		.executeTakeFirst();
	if (!data) {
		throw new Error(`Word with id ${id} not found`);
	}
	return data;
};

export const insertWord: InsertWord = async (
	data: InsertData,
): Promise<{ insertedRows: string }> => {
	const query = db.insertInto('word').values({
		word_text: data.text,
		language_code: data.languageCode,
	});
	const result = await query.executeTakeFirstOrThrow();
	return { insertedRows: result.numInsertedOrUpdatedRows?.toString() ?? '0' };
};

export const updateWord: UpdateWord = async (data) => {
	const query = db
		.updateTable('word')
		.set({
			word_text: data.text,
			language_code: data.languageCode,
		})
		.where('word_id', '=', data.id);
	const result = await query.executeTakeFirstOrThrow();
	return { updatedRows: result.numUpdatedRows.toString() };
};

export const deleteWord: DeleteWord = async (id: number) => {
	const query = db.deleteFrom('word').where('word.word_id', '=', id);
	const result = await query.executeTakeFirstOrThrow();
	return {
		deletedRowsCount: result.numDeletedRows.toString(),
	};
};
