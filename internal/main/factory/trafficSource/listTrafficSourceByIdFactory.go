package trafficSourceFactories

import (
	trafficSourceUseCases "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/app/useCases/trafficSource"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
	trafficSourceControllers "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/controllers/trafficSource"
	contracts "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/contracts"
)

func NewListTrafficSourceByIdFactory(trafficSourceRepository repositories.TrafficSourceRepository) contracts.Controller {
	listTrafficSourceByIdUseCase := trafficSourceUseCases.NewListTrafficSourceByIdUseCase(trafficSourceRepository)
	return trafficSourceControllers.NewListTrafficSourceByIdController(listTrafficSourceByIdUseCase)
}
