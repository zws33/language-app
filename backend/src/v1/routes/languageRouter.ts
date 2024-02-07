import { Router } from 'express';
import * as repository from '../data/repositories/languageRepository.js';
import { isError } from '../../utils/Result.js';

const languageRouter = Router();

languageRouter.get('/', async (req, res) => {
  const result = await repository.findLanguages();
  if (isError(result)) {
    res.status(500).json(result);
    return;
  } else {
    res.json({ languages: result.data });
  }
});

languageRouter.post('/', async (req, res) => {
  const languageCode = req.body.language_code as string;
  const result = await repository.insertLanguage([languageCode]);
  if (isError(result)) {
    res.status(500).json(result);
    return;
  } else {
    res.json({ insertedLanguages: result.data });
  }
});
languageRouter.delete('/:language_code', async (req, res) => {
  const languageCode = req.params.language_code as string;
  const result = await repository.deleteLanguage(languageCode);
  if (isError(result)) {
    res.status(500).json(result);
    return;
  } else {
    res.json({ deletedLanguages: result.data });
  }
});
export default languageRouter;
