import { Selectable } from 'kysely';
import { Word as dbWord, Translation as dbTranslation } from 'kysely-codegen';

export type TranslationRequest = {
  words: Word[];
  target_lang: string;
};

export type TranslationResult = {
  words: Word[];
};

export type Word = Selectable<dbWord>;
export type Translation = Selectable<dbTranslation>;
