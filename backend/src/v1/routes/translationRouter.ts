import { Router, Request } from 'express';
import { getTranslation } from '../data/apis/translationApi.js';
import { Result } from '../../utils/Result.js';
import { BaseError } from '../../utils/BaseError.js';

export const translationRouter = Router();

function extractQueryParams(
  req: Request,
): Result<{ words: { text: string; source_lang: string }[]; target_lang: string }> {
  const query = req.query;
  if (!query.text || !query.source_lang || !query.target_lang) {
    return { success: false, error: new BaseError('text, source_lang, and target_lang are required') };
  } else {
    return {
      success: true,
      result: {
        words: (query.text as string).split(',').map((text) => {
          return { text, source_lang: query.source_lang as string };
        }),
        target_lang: query.target_lang as string,
      },
    };
  }
}

translationRouter.get('/', async (req, res) => {
  const queryParams = extractQueryParams(req);
  switch (queryParams.success) {
    case false: {
      res.status(400).json(queryParams.error);
      return;
    }
    case true: {
      const translation = await getTranslation(queryParams.result);
      res.json(translation);
      return;
    }
  }
});
