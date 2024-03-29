package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/joho/godotenv"
	"github.com/zws33/language-app/translation-service/router"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	r := router.New()
	port := 80
	log.Printf("Starting the server on port %d...\n", port)
	loggedRouter := handlers.LoggingHandler(os.Stdout, r)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), loggedRouter))
}
