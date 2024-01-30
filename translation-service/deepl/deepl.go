package deepl

import (
	"bytes"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"os"

	"github.com/zws33/language-app/translation-service/models"
)

func GetTranslation(data models.TranslationRequest) (*models.TranslationResponse, error) {
	text := make([]string, len(data.Words))
	sourceLanguage := data.Words[0].LanguageCode
	for i, word := range data.Words {
		if word.LanguageCode != sourceLanguage {
			return nil, errors.New("source words must be in the same language")
		} else {
			text[i] = word.Text
		}
	}

	requestParams := struct {
		Text           []string `json:"text"`
		TargetLanguage string   `json:"target_lang"`
	}{text, data.TargetLanguage}

	var buffer bytes.Buffer
	err := json.NewEncoder(&buffer).Encode(requestParams)
	if err != nil {
		return nil, err
	}

	url := os.Getenv("TRANSLATION_API_URL")
	apiKey := os.Getenv("TRANSLATION_API_KEY")
	deepLRequest, err := http.NewRequest("POST", url, &buffer)
	if err != nil {
		return nil, err
	}

	deepLRequest.Header.Set("Authorization", "DeepL-Auth-Key "+apiKey)
	deepLRequest.Header.Set("Content-Type", "application/json")
	response, err := http.DefaultClient.Do(deepLRequest)
	if err != nil {
		log.Printf("Error fetching translation. \n Error: %s", err.Error())
		return nil, err
	}
	defer response.Body.Close()
	var deepLResponse deepLResponse
	err = json.NewDecoder(response.Body).Decode(&deepLResponse)
	if err != nil {
		log.Printf("Error decoding translation response. \n Error: %s", err.Error())
		return nil, err
	}
	words := []models.Word{}
	for _, translation := range deepLResponse.Translations {
		word := models.Word{
			Text:         translation.Text,
			LanguageCode: data.TargetLanguage,
		}
		words = append(words, word)
	}
	translationResponse := models.TranslationResponse{Words: words}
	return &translationResponse, err
}

type deepLResponse struct {
	Translations []struct {
		DetectedSourceLanguage string `json:"detected_source_language"`
		Text                   string `json:"text"`
	} `json:"translations"`
}
