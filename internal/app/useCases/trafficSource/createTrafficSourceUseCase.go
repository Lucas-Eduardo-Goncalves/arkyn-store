package trafficSourceUseCases

import (
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
	domainErrors "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/errors"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/providers"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
)

type CreateTrafficSourceUseCase struct {
	trafficSourceRepository repositories.TrafficSourceRepository
	dateGenerator           providers.DateGenerator
	uuidGenerator           providers.UuidGenerator
}

type CreateTrafficSourceInput struct {
	Name          string
	UserId        string
	TrafficDomain string
}

func NewCreateTrafficSourceUseCase(
	trafficSourceRepository repositories.TrafficSourceRepository,
	dateGenerator providers.DateGenerator,
	uuidGenerator providers.UuidGenerator,
) *CreateTrafficSourceUseCase {
	return &CreateTrafficSourceUseCase{
		trafficSourceRepository: trafficSourceRepository,
		dateGenerator:           dateGenerator,
		uuidGenerator:           uuidGenerator,
	}
}

func (t *CreateTrafficSourceUseCase) Handle(input *CreateTrafficSourceInput) (*entities.TrafficSource, error) {
	trafficSourceByDomain, _ := t.trafficSourceRepository.FindByDomain(input.UserId, input.TrafficDomain)

	if trafficSourceByDomain != nil {
		return nil, domainErrors.AlreadyExists("There is already a traffic source for this domain.")
	}

	trafficSource := entities.NewTrafficSource(
		&entities.NewTrafficSourceInput{Name: input.Name, UserId: input.UserId, TrafficDomain: input.TrafficDomain},
		t.uuidGenerator,
		t.dateGenerator,
	)

	_, createRepositoryErr := t.trafficSourceRepository.Create(trafficSource)

	if createRepositoryErr != nil {
		return nil, createRepositoryErr
	}

	return trafficSource, nil
}
