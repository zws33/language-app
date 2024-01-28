package router

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/zws33/language-app/translation-service/deepl"
	"github.com/zws33/language-app/translation-service/models"

	"github.com/gorilla/mux"
)

func New() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/", rootHandler)
	r.HandleFunc("/translations", translationHandler).Methods("POST")
	return r
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("hello world!"))
}

func translationHandler(w http.ResponseWriter, r *http.Request) {

	data, decodingError := getTranslationRequestData(r)
	if decodingError != nil {
		log.Println(decodingError.Error())
		http.Error(w, decodingError.Error(), http.StatusBadRequest)
		return
	}

	deepLResponse, err := deepl.GetTranslation(data)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	responseBody, err := json.Marshal(deepLResponse)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(responseBody)
}

func getTranslationRequestData(r *http.Request) (models.TranslationRequest, error) {
	var data models.TranslationRequest
	err := json.NewDecoder(r.Body).Decode(&data)
	return data, err
}
