import { Selectable } from 'kysely';
import { Word as dbWord } from 'kysely-codegen';

export type TranslationRequest = {
  words: Word[];
  target_language: string;
};

export type TranslationResult = {
  words: Word[];
};

export type Word = Selectable<dbWord>;
