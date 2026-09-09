package trafficSourceFactories

import (
	trafficSourceUseCases "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/app/useCases/trafficSource"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/adapters"
	trafficSourceControllers "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/controllers/trafficSource"
	contracts "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/contracts"
)

func NewCreateTrafficSourceFactory(trafficSourceRepository repositories.TrafficSourceRepository) contracts.Controller {
	createTrafficSourceUseCase := trafficSourceUseCases.NewCreateTrafficSourceUseCase(
		trafficSourceRepository,
		&adapters.DateGenerator{},
		&adapters.UuidGenerator{},
	)

	return trafficSourceControllers.NewCreateTrafficSourceController(createTrafficSourceUseCase)
}
