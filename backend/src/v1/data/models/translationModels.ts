import { Word } from 'kysely-codegen';

export type TranslationRequest = {
  words: Word[];
  target_language: string;
};

export type TranslationResult = {
  words: Word[];
};
