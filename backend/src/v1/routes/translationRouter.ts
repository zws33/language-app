import { Router } from 'express';
import { TranslationRequest } from '../data/models/translationModels.js';
import { findTranslations } from '../data/repositories/translationRepository.js';
import { getTranslation } from '../data/apis/translationApi.js';

export const translationRouter = Router();

translationRouter.post('/', async (req, res) => {
  const translationRequest: TranslationRequest = req.body;
  const requestedWord = translationRequest.words.map((word) => word.word_text);
  const translatedWords = await findTranslations(requestedWord);
  console.log(translatedWords);

  if (!translatedWords) {
    res.status(500).json({
      error: 'Could not get translations',
    });
    return;
  }

  if (translatedWords.length > 0) {
    res.status(200).json({
      translated_words: translatedWords,
    });
  } else {
    res.status(404).json({ error: 'No translations found' });
  }
});
