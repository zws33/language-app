package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
)

func main() {
	mux := http.NewServeMux()

	// Register a handler for the "/hello" path with a URL parameter ":name"
	mux.HandleFunc("/", RootHandler)
	mux.HandleFunc("/translate", TranslateHandler)

	// Start the servear on port 8080
	log.Fatal(http.ListenAndServe(":8080", mux))
	log.Println("Server listening on :8080...")

}

func RootHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("hello world!"))
}

func TranslateHandler(w http.ResponseWriter, r *http.Request) {
	requestParams := r.URL.Query()

	text := requestParams.Get("text")
	targetLanguage := requestParams.Get("target_lang")

	request := buildTranslationRequest(text, targetLanguage)

	response, err := http.DefaultClient.Do(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer response.Body.Close()
	body, err := io.ReadAll(response.Body)
	w.Write(body)
}

func buildTranslationRequest(text string, targetLanguage string) *http.Request {
	params := url.Values{}
	params.Add("text", text)
	params.Add("target_lang", targetLanguage)

	baseURL := fmt.Sprintf("https://api-free.deepl.com/v2/translate?" + params.Encode())

	request, _ := http.NewRequest("POST", baseURL, nil)
	apiKey := os.Getenv("TRANSLATION_API_KEY")
	request.Header.Set("Authorization", "DeepL-Auth-Key "+apiKey)
	return request
}
