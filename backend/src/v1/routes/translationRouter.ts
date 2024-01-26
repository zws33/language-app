import { Router, Request } from 'express';
import { getTranslation } from '../data/apis/translationApi.js';
import { Result } from '../../utils/Result.js';
import { BaseError } from '../../utils/BaseError.js';

export const translationRouter = Router();

function extractQueryParams(req: Request): Result<{ text: string; source_lang: string; target_lang: string }> {
  const { text, source_lang, target_lang } = req.query;
  if (!text || !source_lang || !target_lang) {
    return { success: false, error: new BaseError('text, source_lang, and target_lang are required') };
  } else {
    return {
      success: true,
      result: {
        text: text as string,
        source_lang: source_lang as string,
        target_lang: target_lang as string,
      },
    };
  }
}

translationRouter.get('/', async (req, res) => {
  const queryParamsResult = extractQueryParams(req);
  switch (queryParamsResult.success) {
    case false: {
      res.status(400).json(queryParamsResult.error);
      return;
    }
    case true: {
      const { text, source_lang, target_lang } = queryParamsResult.result;
      const translation = await getTranslation(text, source_lang, target_lang);
      res.json(translation);
      return;
    }
  }
});
