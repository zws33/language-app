package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/zws33/language-app/translation-service/server"
)

func main() {
	server := server.DeepLServer()
	port := 80
	log.Printf("Starting the server on port %d...\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), server))
}
