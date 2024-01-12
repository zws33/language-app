export async function fetchTranslation(text: string, targetLanguage: string): Promise<{text: string}> {
    const baseUrl = process.env.TRANSLATION_SERVICE_URL as string;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'https://zwsmith.com',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            text : text,
            target_lang : targetLanguage,
        })
    };

    let response = await fetch(baseUrl, requestOptions);
    if (response.ok) {
        return await response.json()
    } else {
        console.log(response);
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}


export interface TranslationResponse extends Response {
    translations: Translation[];
}

export interface Translation {
    detected_source_language: string;
    text: string;
}


