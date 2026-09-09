package trafficSourceUseCases

import (
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
)

type ListTrafficSourceByIdUseCase struct {
	trafficSourceRepository repositories.TrafficSourceRepository
}

func NewListTrafficSourceByIdUseCase(trafficSourceRepository repositories.TrafficSourceRepository) *ListTrafficSourceByIdUseCase {
	return &ListTrafficSourceByIdUseCase{trafficSourceRepository: trafficSourceRepository}
}

func (t *ListTrafficSourceByIdUseCase) Handle(trafficSourceId string) (*entities.TrafficSource, error) {
	trafficSources, err := t.trafficSourceRepository.FindById(trafficSourceId)

	if err != nil {
		return nil, err
	}

	return trafficSources, nil
}
