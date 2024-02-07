import { Router } from 'express';
import { TranslationRequest } from '../data/models/models.js';
import * as repository from '../data/repositories/translationRepository.js';
import { isError } from '../../utils/Result.js';

export const translationRouter = Router();

translationRouter.post('/', async (req, res) => {
  const translationRequest: TranslationRequest = req.body;
  const requestedWord = translationRequest.words.map((word) => word.word_text);
  const translatedWords = await repository.findTranslations(requestedWord);
  console.log(translatedWords);

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
  } else {
    res.status(404).json({ error: 'No translations found' });
  }
});
