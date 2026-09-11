package trafficSourceFactories

import (
	trafficSourceUseCases "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/app/useCases/trafficSource"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/adapters"
	trafficSourceControllers "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/controllers/trafficSource"
	contracts "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/contracts"
)

func NewUpdateTrafficSourceFactory(trafficSourceRepository repositories.TrafficSourceRepository) contracts.Controller {
	updateTrafficSourceUseCase := trafficSourceUseCases.NewUpdateTrafficSourceUseCase(
		trafficSourceRepository,
		&adapters.DateGenerator{},
	)

	return trafficSourceControllers.NewUpdateTrafficSourceController(updateTrafficSourceUseCase)
}
