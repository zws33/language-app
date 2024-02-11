import { checkError } from '../../../utils/checkError';
import { Result } from '../../../utils/Result';
import { TranslationRequest } from '../models/models';

type DeepLWord = {
  word_text: string;
  language_code: string;
};

export async function getTranslation(data: TranslationRequest): Promise<Result<DeepLWord[]>> {
  try {
    console.log(data.target_lang);
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.TRANSLATION_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: data.words.map((word) => word.word_text),
        target_lang: data.target_lang,
      }),
    };

    const result = await fetch(process.env.TRANSLATION_SERVICE_URL, options);
    if (!result.ok) {
      throw new Error(result.statusText);
    }
    const response = (await result.json()) as DeepLResponse;
    const translatedWords = response.translations.map((word) => {
      return {
        word_text: word.text,
        language_code: data.target_lang,
      };
    });
    return { data: translatedWords };
  } catch (e) {
    const error = checkError(e);
    return { error };
  }
}

interface DeepLResponse {
  translations: Translation[];
}

interface Translation {
  detected_source_language: string;
  text: string;
}
