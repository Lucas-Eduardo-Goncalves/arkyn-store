package trafficSourceFactories

import (
	trafficSourceUseCases "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/app/useCases/trafficSource"
	trafficSourceControllers "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/controllers/trafficSource"
	trafficSourceRepositories "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/repositories"
	contracts "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/contracts"
)

func NewListTrafficSourcesFactory() contracts.Controller {
	trafficSourceRepository := trafficSourceRepositories.NewInMemoryTrafficSourceRepository()
	listTrafficSourceUseCase := trafficSourceUseCases.NewListTrafficSourcesUseCase(trafficSourceRepository)
	return trafficSourceControllers.NewListTrafficSourcesController(listTrafficSourceUseCase)
}
