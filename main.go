package main

import (
	"log"
	"net/http"

	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/routes"
)

func main() {
	mux := http.NewServeMux()

	routes.RegisterTrafficSourceRoutes(mux)

	log.Println("listening on :8082")
	log.Fatal(http.ListenAndServe(":8082", mux))
}
