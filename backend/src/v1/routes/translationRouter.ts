import { Router } from 'express';
import { TranslationRequest } from '../data/models/models.js';
import * as translationRepository from '../data/repositories/translationRepository.js';
import { isError } from '../../utils/Result.js';
import * as deepLApi from '../data/apis/deepLApi.js';

export const translationRouter = Router();

translationRouter.post('/', async (req, res) => {
  const translationRequest: TranslationRequest = req.body;
  const requestedWords = translationRequest.words.map((word) => word.word_text);
  const internalTranslation = await translationRepository.findTranslations(requestedWords);

  if (isError(internalTranslation)) {
    console.error(internalTranslation.error.message);
    res.status(500).json({
      error: 'Could not get translations',
    });
    return;
  }

  if (internalTranslation.data.length > 0) {
    console.log(`Internal translation found: ${JSON.stringify(internalTranslation.data)}`);
    res.status(200).json({
      translatedWords: internalTranslation.data,
    });
    return;
  }
  console.log('No internal translation found. Fetching from external API.');
  const externalTranslation = await deepLApi.getTranslation(translationRequest);
  if (isError(externalTranslation)) {
    console.error(`Error fetching external translation. \nError: ${externalTranslation.error.message}`);
    res.status(500).json({ error: externalTranslation.error.message });
    return;
  } else {
    console.log(`External translation success: ${JSON.stringify(externalTranslation.data)}`);
    const saveResult = await translationRepository.insertTranslationByWords([
      translationRequest.words[0],
      externalTranslation.data[0],
    ]);
    if (isError(saveResult)) {
      console.error(`Error saving translation to db. \nError: ${saveResult.error.message}`);
      res.status(500).json({ error: saveResult.error.message });
      return;
    } else {
      console.log(`Translation success: ${JSON.stringify(externalTranslation.data)}`);
      res.status(200).json({ translation: externalTranslation.data });
    }
  }
});
