package main

import (
	"log"
	"net/http"

	"github.com/zws33/language-app/translation-service/server"
)

func main() {
	// Register a handler for the "/hello" path with a URL parameter ":name"
	server := server.DeepLServer()
	log.Println("Starting the server on port 8080")
	log.Fatal(http.ListenAndServe(":8080", server))
}
