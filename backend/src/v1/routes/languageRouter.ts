import { Router } from 'express';
import * as repository from '../data/repositories/languageRepository.js'; // Import the missing repository module

const languageRouter = Router();

languageRouter.get('/', async (req, res) => {
  const result = await repository.getLanguages();
  res.json(result);
});

languageRouter.post('/', async (req, res) => {
  const languageCode = req.body.language_code as string;
  const result = await repository.insertLanguage(languageCode);
  res.json(result);
});

export default languageRouter;
