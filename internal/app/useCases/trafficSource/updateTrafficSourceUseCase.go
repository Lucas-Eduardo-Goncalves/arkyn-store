package trafficSourceUseCases

import (
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
	domainErrors "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/errors"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/providers"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
)

type UpdateTrafficSourceUseCase struct {
	trafficSourceRepository repositories.TrafficSourceRepository
	dateGenerator           providers.DateGenerator
}

type UpdateTrafficSourceInput struct {
	Name            *string
	TrafficDomain   *string
	UserId          string
	TrafficSourceId string
}

func NewUpdateTrafficSourceUseCase(
	trafficSourceRepository repositories.TrafficSourceRepository,
	dateGenerator providers.DateGenerator,
) *UpdateTrafficSourceUseCase {
	return &UpdateTrafficSourceUseCase{
		trafficSourceRepository: trafficSourceRepository,
		dateGenerator:           dateGenerator,
	}
}

func (t *UpdateTrafficSourceUseCase) Handle(input *UpdateTrafficSourceInput) (*entities.TrafficSource, error) {
	trafficSource, err := t.trafficSourceRepository.FindById(input.TrafficSourceId)

	if err != nil {
		return nil, err
	}

	if trafficSource == nil {
		return nil, domainErrors.NotFound("This traffic source don't exists.")
	}

	if trafficSource.UserId != input.UserId {
		return nil, domainErrors.Invalid("You aren't traffic source owner.")
	}

	trafficSource.Update(
		&entities.UpdateTrafficSourceInput{Name: input.Name, TrafficDomain: input.TrafficDomain},
		t.dateGenerator,
	)

	_, err = t.trafficSourceRepository.Update(trafficSource)

	if err != nil {
		return nil, err
	}

	return trafficSource, nil
}
