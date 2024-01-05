import React, { useState, FormEvent } from 'react';

async function getTranslation(inputValue: string): Promise<string> {
    let translateUrl = `http://localhost:3001/translate?target_lang=ES&text=${inputValue}`
    let response = await fetch(translateUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!response.ok) {
        return "Error"
    } else {
        return response.json()
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
            setResultText(result)
        } catch (e) {
            console.log(e)
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