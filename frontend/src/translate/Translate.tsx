import React, { useState, FormEvent } from 'react';

interface TranslationResponse {
    translations: Translation[];
}

interface Translation {
    detected_source_language: string,
    text: string;
}

type TranslationError = {
    message: string;
};

function getBaseUrl() {
    let baseUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;
    return baseUrl;
}

async function getTranslation(inputValue: string): Promise<TranslationResponse | TranslationError> {
    let baseUrl = getBaseUrl();
    let translateUrl = `${baseUrl}/translate?target_lang=ES&text=${inputValue}`;
    let response = await fetch(translateUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        return { message: await response.text() };
    } else {
        return response.json();
    }
}

const TranslateForm: React.FC = () => {
    // State variables
    const [inputValue, setInputValue] = useState<string>('');
    const [resultText, setResultText] = useState<string>('');


    // Function to handle form submission
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            let result = await getTranslation(inputValue);
            let text = (result as TranslationResponse).translations[0].text;
            setResultText(text);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Text:
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>

            <div>
                <textarea
                    rows={4}
                    cols={50}
                    readOnly
                    value={resultText}
                />
            </div>
        </div>
    );
};

export default TranslateForm;
