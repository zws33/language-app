package server

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
)

func DeepLServer() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/", rootHandler)
	mux.HandleFunc("/translate", translateHandler)
	return mux
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("hello world!"))
}

func translateHandler(w http.ResponseWriter, r *http.Request) {

	translationRequest, decodingError := getTranslationRequestData(r)
	if decodingError != nil {
		log.Println(decodingError.Error())
		http.Error(w, decodingError.Error(), http.StatusBadRequest)
		return
	}

	log.Printf(
		`Translation requested.
		Text: %s
		Target language: %s`,
		translationRequest.Text,
		translationRequest.TargetLanguage)

	request, err := buildDeepLRequest(translationRequest.Text, translationRequest.TargetLanguage)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response, err := http.DefaultClient.Do(request)

	if err != nil {
		log.Printf("Error fetching translation. \n Error: %s", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer response.Body.Close()

	responseBody, _ := io.ReadAll(response.Body)
	w.Write(responseBody)
}

func buildDeepLRequest(text string, targetLanguage string) (*http.Request, error) {
	requestParams := map[string]interface{}{
		"text":        []string{text},
		"target_lang": targetLanguage,
	}

	var requestBodyBuffer bytes.Buffer
	err := json.NewEncoder(&requestBodyBuffer).Encode(requestParams)
	if err != nil {
		return nil, err
	}

	url := os.Getenv("TRANSLATION_API_URL")
	apiKey := os.Getenv("TRANSLATION_API_KEY")
	request, err := http.NewRequest("POST", url, &requestBodyBuffer)
	if err != nil {
		return nil, err
	}

	request.Header.Set("Authorization", "DeepL-Auth-Key "+apiKey)
	request.Header.Set("Content-Type", "application/json")
	return request, err
}

func getTranslationRequestData(r *http.Request) (TranslationRequest, error) {
	var translationRequest TranslationRequest
	err := json.NewDecoder(r.Body).Decode(&translationRequest)
	return translationRequest, err
}

type TranslationRequest struct {
	Text           string `json:"text"`
	TargetLanguage string `json:"target_lang"`
}
