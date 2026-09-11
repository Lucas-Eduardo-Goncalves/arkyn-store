package trafficSourceUseCases

import (
	domainErrors "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/errors"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
)

type DeleteTrafficSourceUseCase struct {
	trafficSourceRepository repositories.TrafficSourceRepository
}

func NewDeleteTrafficSourceUseCase(
	trafficSourceRepository repositories.TrafficSourceRepository,
) *DeleteTrafficSourceUseCase {
	return &DeleteTrafficSourceUseCase{trafficSourceRepository: trafficSourceRepository}
}

func (t *DeleteTrafficSourceUseCase) Handle(userId string, trafficSourceId string) error {
	trafficSource, err := t.trafficSourceRepository.FindById(trafficSourceId)

	if err != nil {
		return err
	}

	if trafficSource.UserId != userId {
		return domainErrors.Invalid("You aren't traffic source owner.")
	}

	err = t.trafficSourceRepository.Delete(trafficSource)

	if err != nil {
		return err
	}

	return nil
}
