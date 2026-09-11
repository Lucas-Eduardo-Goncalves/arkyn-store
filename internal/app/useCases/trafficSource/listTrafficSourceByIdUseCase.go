package trafficSourceUseCases

import (
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
	domainErrors "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/errors"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
)

type ListTrafficSourceByIdUseCase struct {
	trafficSourceRepository repositories.TrafficSourceRepository
}

func NewListTrafficSourceByIdUseCase(trafficSourceRepository repositories.TrafficSourceRepository) *ListTrafficSourceByIdUseCase {
	return &ListTrafficSourceByIdUseCase{trafficSourceRepository: trafficSourceRepository}
}

func (t *ListTrafficSourceByIdUseCase) Handle(trafficSourceId string) (*entities.TrafficSource, error) {
	trafficSource, err := t.trafficSourceRepository.FindById(trafficSourceId)

	if err != nil {
		return nil, err
	}

	if trafficSource == nil {
		return nil, domainErrors.NotFound("Traffic source not found")
	}

	return trafficSource, nil
}
