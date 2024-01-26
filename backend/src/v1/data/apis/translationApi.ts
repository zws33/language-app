import { checkError } from '../../../utils/checkError';
import { Result } from '../../../utils/Result';

export async function getTranslation(
  text: string,
  sourceLang: string,
  targetLanguage: string,
): Promise<Result<{ translatedText: string }>> {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: targetLanguage,
      }),
    };
    return { success: true, result: { translatedText: 'temp' } };
  } catch (e) {
    const error = checkError(e);
    return { success: false, error };
  }
}
