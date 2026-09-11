package trafficSourceFactories

import (
	trafficSourceUseCases "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/app/useCases/trafficSource"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
	trafficSourceControllers "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/controllers/trafficSource"
	contracts "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/contracts"
)

func NewDeleteTrafficSourceFactory(trafficSourceRepository repositories.TrafficSourceRepository) contracts.Controller {
	deleteTrafficSourceUseCase := trafficSourceUseCases.NewDeleteTrafficSourceUseCase(
		trafficSourceRepository,
	)

	return trafficSourceControllers.NewDeleteTrafficSourceController(deleteTrafficSourceUseCase)
}
