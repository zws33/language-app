import { checkError } from '../../../utils/checkError';
import { Result } from '../../../utils/Result';
import { TranslationResult, TranslationRequest } from '../models/models';

export async function getTranslation(data: TranslationRequest): Promise<Result<TranslationResult>> {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        words: data.words.map((word) => {
          return { text: word.word_text, language_code: word.language_code };
        }),
        target_lang: data.target_language,
      }),
    };
    const result = await fetch(process.env.TRANSLATION_SERVICE_URL, options);
    if (!result.ok) {
      throw new Error('Failed to get translation');
    }
    const response: TranslationResult = await result.json();
    return { data: response };
  } catch (e) {
    const error = checkError(e);
    return { error };
  }
}
