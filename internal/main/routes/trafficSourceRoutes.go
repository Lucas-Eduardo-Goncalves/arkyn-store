package routes

import (
	"net/http"

	trafficSourceRepositories "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/repositories"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/contracts"
	trafficSourceFactories "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/factory/trafficSource"
)

func RegisterTrafficSourceRoutes(mux *http.ServeMux) {
	trafficSourceRepository := trafficSourceRepositories.NewInMemoryTrafficSourceRepository()

	mux.HandleFunc("GET /traffic-sources", contracts.Adapt(trafficSourceFactories.NewListTrafficSourcesFactory(trafficSourceRepository)))
	mux.HandleFunc("GET /traffic-sources/{trafficSourceId}", contracts.Adapt(trafficSourceFactories.NewListTrafficSourceByIdFactory(trafficSourceRepository)))
	mux.HandleFunc("POST /traffic-sources", contracts.Adapt(trafficSourceFactories.NewCreateTrafficSourceFactory(trafficSourceRepository)))
	mux.HandleFunc("DELETE /traffic-sources/{trafficSourceId}", contracts.Adapt(trafficSourceFactories.NewDeleteTrafficSourceFactory(trafficSourceRepository)))
	mux.HandleFunc("PUT /traffic-sources/{trafficSourceId}", contracts.Adapt(trafficSourceFactories.NewUpdateTrafficSourceFactory(trafficSourceRepository)))
}
