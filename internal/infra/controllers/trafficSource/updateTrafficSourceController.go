package trafficSourceControllers

import (
	"encoding/json"
	"net/http"

	trafficSourceUseCases "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/app/useCases/trafficSource"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/adapters"
	"github.com/go-playground/validator/v10"
)

type updateTrafficSourceUseCase interface {
	Handle(input *trafficSourceUseCases.UpdateTrafficSourceInput) (*entities.TrafficSource, error)
}

type UpdateTrafficSourceController struct {
	updateTrafficSourceUseCase updateTrafficSourceUseCase
}

func NewUpdateTrafficSourceController(updateTrafficSourceUseCase updateTrafficSourceUseCase) *UpdateTrafficSourceController {
	return &UpdateTrafficSourceController{updateTrafficSourceUseCase: updateTrafficSourceUseCase}
}

type updateTrafficSourceRequest struct {
	Name          string `json:"name" validate:"omitempty,min=1"`
	TrafficDomain string `json:"trafficDomain" validate:"omitempty,min=1"`
}

func (c *UpdateTrafficSourceController) Handle(w http.ResponseWriter, r *http.Request) error {
	var request updateTrafficSourceRequest
	var userId string = "1"

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	if err := decoder.Decode(&request); err != nil {
		return adapters.NewBadRequest("Invalid request body")
	}

	if err := validator.New().Struct(request); err != nil {
		return adapters.NewBadRequest(err.Error())
	}

	trafficSource, err := c.updateTrafficSourceUseCase.Handle(&trafficSourceUseCases.UpdateTrafficSourceInput{
		Name:          &request.Name,
		TrafficDomain: &request.TrafficDomain,
		UserId:        userId,
	})

	if err != nil {
		return err
	}

	body, err := json.Marshal(trafficSource.ToResponse())

	if err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(body)

	return nil
}
