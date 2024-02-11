import { Router } from 'express';
import { TranslationRequest } from '../data/models/models.js';
import * as translationRepository from '../data/repositories/translationRepository.js';
import * as wordRepository from '../data/repositories/wordRepository.js';
import { isError } from '../../utils/Result.js';
import * as deepLApi from '../data/apis/deepLApi.js';

export const translationRouter = Router();

translationRouter.post('/', async (req, res) => {
  const translationRequest: TranslationRequest = req.body;
  const requestedWord = translationRequest.words.map((word) => word.word_text);
  const translatedWords = await translationRepository.findTranslations(requestedWord);

  if (isError(translatedWords)) {
    res.status(500).json({
      error: 'Could not get translations',
    });
    return;
  }

  if (translatedWords.data.length > 0) {
    res.status(200).json({
      translatedWords: translatedWords.data,
    });
    return;
  }

  const translation = await deepLApi.getTranslation(translationRequest);
  if (isError(translation)) {
    res.status(500).json({ error: translation.error.message });
    return;
  } else {
    const insertedWords = await wordRepository.insertWord(translation.data);
    if (isError(insertedWords)) {
      res.status(500).json({ error: insertedWords.error.message });
      return;
    } else {
      console.log(insertedWords.data);
      const translations = translationRequest.words.map((word, index) => {
        return {
          first_word_id: word.word_id,
          second_word_id: insertedWords.data[index].word_id,
        };
      });
      const insertedTranslations = await translationRepository.insertTranslation(translations);
      if (isError(insertedTranslations)) {
        res.status(500).json({ error: insertedTranslations.error.message });
        return;
      }
      res.status(200).json(insertedWords.data);
    }
  }
});
