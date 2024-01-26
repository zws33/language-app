import { Router } from 'express';
import * as repository from '../data/repositories/wordRepository.js';

const wordRouter = Router();

wordRouter.get('/', async (req, res) => {
  const languageCode = req.query.language_code as string;
  const result = await repository.getWords(languageCode);
  res.json(result);
});

wordRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await repository.getWord(id);
  res.json(result);
});

wordRouter.post('/', async (req, res) => {
  const result = await repository.insertWord(req.body);
  res.json(result);
});

wordRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await repository.updateWord({ id, ...req.body });
  res.json(result);
});

wordRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await repository.deleteWord(id);
  res.json(result);
});

export default wordRouter;
