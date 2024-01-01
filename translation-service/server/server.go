package server

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
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
	requestParams := r.URL.Query()

	text := requestParams.Get("text")
	targetLanguage := requestParams.Get("target_lang")

	request := buildDeepLTranslationRequest(text, targetLanguage)

	response, err := http.DefaultClient.Do(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer response.Body.Close()
	body, err := io.ReadAll(response.Body)
	w.Write(body)
}

func buildDeepLTranslationRequest(text string, targetLanguage string) *http.Request {
	params := url.Values{}
	params.Add("text", text)
	params.Add("target_lang", targetLanguage)

	baseURL := fmt.Sprintf("https://api-free.deepl.com/v2/translate?" + params.Encode())

	request, _ := http.NewRequest("POST", baseURL, nil)
	apiKey := os.Getenv("TRANSLATION_API_KEY")
	request.Header.Set("Authorization", "DeepL-Auth-Key "+apiKey)
	return request
}
