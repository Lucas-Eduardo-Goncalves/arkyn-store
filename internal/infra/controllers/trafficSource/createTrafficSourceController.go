package trafficSourceControllers

import (
	"encoding/json"
	"net/http"

	trafficSourceUseCases "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/app/useCases/trafficSource"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/adapters"
	"github.com/go-playground/validator/v10"
)

type createTrafficSourceUseCase interface {
	Handle(input *trafficSourceUseCases.CreateTrafficSourceInput) (*entities.TrafficSource, error)
}

type CreateTrafficSourceController struct {
	createTrafficSourceUseCase createTrafficSourceUseCase
}

func NewCreateTrafficSourceController(createTrafficSourceUseCase createTrafficSourceUseCase) *CreateTrafficSourceController {
	return &CreateTrafficSourceController{createTrafficSourceUseCase: createTrafficSourceUseCase}
}

type createTrafficSourceRequest struct {
	Name          string `json:"name" validate:"required"`
	TrafficDomain string `json:"trafficDomain" validate:"required"`
	UserId        string `json:"userId" validate:"required"`
}

func (c *CreateTrafficSourceController) Handle(w http.ResponseWriter, r *http.Request) error {
	var request createTrafficSourceRequest

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	if err := decoder.Decode(&request); err != nil {
		return adapters.NewBadRequest("Invalid request body")
	}

	if err := validator.New().Struct(request); err != nil {
		return adapters.NewBadRequest(err.Error())
	}

	trafficSource, err := c.createTrafficSourceUseCase.Handle(&trafficSourceUseCases.CreateTrafficSourceInput{
		Name:          request.Name,
		TrafficDomain: request.TrafficDomain,
		UserId:        request.UserId,
	})

	if err != nil {
		return err
	}

	body, err := json.Marshal(trafficSource.ToResponse())

	if err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(body)

	return nil
}
