package trafficSourceFactories

import (
	trafficSourceUseCases "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/app/useCases/trafficSource"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
	trafficSourceControllers "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/controllers/trafficSource"
	contracts "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/contracts"
)

func NewListTrafficSourcesFactory(trafficSourceRepository repositories.TrafficSourceRepository) contracts.Controller {
	listTrafficSourcesUseCase := trafficSourceUseCases.NewListTrafficSourcesUseCase(trafficSourceRepository)
	return trafficSourceControllers.NewListTrafficSourcesController(listTrafficSourcesUseCase)
}
