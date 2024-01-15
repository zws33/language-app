interface TranslationApi {
    getTranslation(text: string, targetLanguage: string): Promise<TranslationResponse>;
};

type TranslationResponse = {
    translations: TranslationDto[];
};

type TranslationDto = {
    detected_source_language: string;
    text: string;
};

type RequestOptions = {
    method: string;
    headers: { [key: string]: string; };
    body: string;
};

class TranslationApiImpl implements TranslationApi {

    baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url;
    }

    requestOptions(text: string, targetLanguage: string): RequestOptions {
        return {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                text: text,
                target_lang: targetLanguage,
            })
        };
    };


    async getTranslation(text: string, targetLanguage: string): Promise<TranslationResponse> {
        let response = await fetch(this.baseUrl, this.requestOptions(text, targetLanguage));
        if (response.ok) {
            response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    };
}
