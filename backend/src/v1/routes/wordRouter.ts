import { Router } from 'express';
import * as repository from '../data/repositories/wordRepository.js';
import { Word } from '../data/models/models.js';
import { isError } from '../../utils/Result.js';

const wordRouter = Router();

wordRouter.get('/', async (req, res) => {
  const languageCode = req.query.language_code as string;
  const result = await repository.findWords(languageCode);
  if (isError(result)) {
    res.status(500).json(result);
    return;
  } else {
    res.json({ words: result.data });
  }
});

wordRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await repository.findWord(id);
  if (isError(result)) {
    res.status(500).json(result);
    return;
  } else {
    res.json({ word: result.data });
  }
});

wordRouter.post('/', async (req, res) => {
  const words: Word[] = req.body.words;
  const result = await repository.insertWord(words);
  if (isError(result)) {
    res.status(500).json(result);
    return;
  } else {
    res.json({ insertedWords: result.data });
  }
});

wordRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await repository.updateWord({ id, ...req.body });
  if (isError(result)) {
    res.status(500).json(result);
    return;
  } else {
    res.json({ updatedWords: result.data });
  }
});

wordRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await repository.deleteWord(id);
  if (isError(result)) {
    res.status(500).json(result);
    return;
  } else {
    res.json({ deletedWords: result.data });
  }
});

export default wordRouter;
