package mwdictionary

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/zws33/language-app/translation-service/models"
)

func BuildDictionaryRequest(text string) (*models.TranslationResponse, error) {
	url := os.Getenv("DICTIONARY_API_URL")
	apiKey := os.Getenv("DICTIONARY_API_KEY")
	fullUrl := fmt.Sprintf("%s/%s?key=%s", url, text, apiKey)
	fmt.Println(fullUrl)
	request, err := http.NewRequest("GET", fullUrl, nil)
	if err != nil {
		log.Printf("Error building dictionary request. \n Error: %s", err.Error())
		return nil, err
	}

	response, err := http.DefaultClient.Do(request)
	if err != nil {
		log.Printf("Error fetching translation. \n Error: %s", err.Error())
		return nil, err
	}
	defer response.Body.Close()
	var dictionaryResponse dictionaryResponse
	err = json.NewDecoder(response.Body).Decode(&dictionaryResponse)
	if err != nil {
		log.Printf("Error decoding translation response. \n Error: %s", err.Error())
		return nil, err
	}
	words := []models.Word{{Text: dictionaryResponse[0].Shortdef[0]}}
	translation := models.TranslationResponse{Words: words}
	return &translation, err
}

type dictionaryResponse []struct {
	Meta struct {
		ID        string   `json:"id"`
		UUID      string   `json:"uuid"`
		Lang      string   `json:"lang"`
		Sort      string   `json:"sort"`
		Src       string   `json:"src"`
		Section   string   `json:"section"`
		Stems     []string `json:"stems"`
		Offensive bool     `json:"offensive"`
	} `json:"meta"`
	Hwi struct {
		Hw  string `json:"hw"`
		Prs []struct {
			Mw    string `json:"mw"`
			Sound struct {
				Audio string `json:"audio"`
			} `json:"sound"`
		} `json:"prs"`
	} `json:"hwi"`
	Fl  string `json:"fl"`
	Def []struct {
		Sseq [][][]any `json:"sseq"`
	} `json:"def"`
	Shortdef []string `json:"shortdef"`
}
