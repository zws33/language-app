export type Word = {
	id: number;
	text: string;
	languageCode: string;
};
export type Translation = {
	id: string;
	sourceWord: Word;
	targetWord: Word;
};
export type Language = {
	code: string;
};
