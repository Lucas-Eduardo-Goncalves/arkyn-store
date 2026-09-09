package trafficSourceUseCases

import (
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
)

type ListTrafficSourcesUseCase struct {
	trafficSourceRepository repositories.TrafficSourceRepository
}

func NewListTrafficSourcesUseCase(trafficSourceRepository repositories.TrafficSourceRepository) *ListTrafficSourcesUseCase {
	return &ListTrafficSourcesUseCase{trafficSourceRepository: trafficSourceRepository}
}

func (t *ListTrafficSourcesUseCase) Handle(userId string) ([]*entities.TrafficSource, error) {
	trafficSources, err := t.trafficSourceRepository.FindAll(userId)

	if err != nil {
		return nil, err
	}

	return trafficSources, nil
}
