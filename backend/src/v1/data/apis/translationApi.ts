import { checkError } from '../../../utils/checkError';
import { Result } from '../../../utils/Result';

type TranslationRequest = {
  words: { text: string; source_lang: string }[];
  target_lang: string;
};

type TranslationResponse = {
  words: { text: string; language_code: string }[];
};

export async function getTranslation(data: TranslationRequest): Promise<Result<TranslationResponse>> {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        words: data.words.map((word) => {
          return { text: word.text, source_lang: word.source_lang };
        }),
        target_lang: data.target_lang,
      }),
    };
    const result = await fetch(process.env.TRANSLATION_SERVICE_URL, options);
    if (!result.ok) {
      throw new Error('Failed to get translation');
    }
    const response: TranslationResponse = await result.json();
    return { success: true, result: response };
  } catch (e) {
    const error = checkError(e);
    return { success: false, error };
  }
}
