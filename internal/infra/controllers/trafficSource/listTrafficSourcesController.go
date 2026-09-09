package trafficSourceControllers

import (
	"encoding/json"
	"net/http"

	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/adapters"
)

type listTrafficSourcesUseCase interface {
	Handle(userId string) ([]*entities.TrafficSource, error)
}

type ListTrafficSourcesController struct {
	listTrafficSourcesUseCase listTrafficSourcesUseCase
}

func NewListTrafficSourcesController(listTrafficSourcesUseCase listTrafficSourcesUseCase) *ListTrafficSourcesController {
	return &ListTrafficSourcesController{listTrafficSourcesUseCase: listTrafficSourcesUseCase}
}

func (c *ListTrafficSourcesController) Handle(w http.ResponseWriter, r *http.Request) error {
	userId := r.PathValue("userId")
	trafficSources, err := c.listTrafficSourcesUseCase.Handle(userId)

	if err != nil {
		return adapters.NewBadRequest("Invalid user id")
	}

	body, err := json.Marshal(trafficSources)

	if err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(body)

	return nil
}
