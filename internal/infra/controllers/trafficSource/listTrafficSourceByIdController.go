package trafficSourceControllers

import (
	"encoding/json"
	"net/http"

	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
)

type listTrafficSourceByIdUseCase interface {
	Handle(userId string) (*entities.TrafficSource, error)
}

type ListTrafficSourceByIdController struct {
	listTrafficSourceByIdUseCase listTrafficSourceByIdUseCase
}

func NewListTrafficSourceByIdController(listTrafficSourceByIdUseCase listTrafficSourceByIdUseCase) *ListTrafficSourceByIdController {
	return &ListTrafficSourceByIdController{listTrafficSourceByIdUseCase: listTrafficSourceByIdUseCase}
}

func (c *ListTrafficSourceByIdController) Handle(w http.ResponseWriter, r *http.Request) error {
	trafficSourceId := r.PathValue("trafficSourceId")
	trafficSource, err := c.listTrafficSourceByIdUseCase.Handle(trafficSourceId)

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
