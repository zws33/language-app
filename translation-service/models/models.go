package models

type TranslationRequest struct {
	Words          []Word `json:"words"`
	TargetLanguage string `json:"target_lang"`
}

type TranslationResponse struct {
	Words []Word `json:"words"`
}

type Word struct {
	Text         string `json:"text"`
	LanguageCode string `json:"language_code"`
}
