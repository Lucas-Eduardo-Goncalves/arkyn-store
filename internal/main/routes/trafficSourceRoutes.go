package routes

import (
	"net/http"

	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/contracts"
	trafficSourceFactories "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/factory/trafficSource"
)

func RegisterTrafficSourceRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /traffic-sources", contracts.Adapt(trafficSourceFactories.NewListTrafficSourcesFactory()))
}
