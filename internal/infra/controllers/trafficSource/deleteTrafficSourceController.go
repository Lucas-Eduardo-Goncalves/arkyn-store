package trafficSourceControllers

import (
	"net/http"
)

type deleteTrafficSourceUseCase interface {
	Handle(userId string, trafficSourceId string) error
}

type DeleteTrafficSourceController struct {
	deleteTrafficSourceUseCase deleteTrafficSourceUseCase
}

func NewDeleteTrafficSourceController(deleteTrafficSourceUseCase deleteTrafficSourceUseCase) *DeleteTrafficSourceController {
	return &DeleteTrafficSourceController{deleteTrafficSourceUseCase: deleteTrafficSourceUseCase}
}

func (c *DeleteTrafficSourceController) Handle(w http.ResponseWriter, r *http.Request) error {
	trafficSourceId := r.PathValue("trafficSourceId")
	var userId string = "1"

	err := c.deleteTrafficSourceUseCase.Handle(userId, trafficSourceId)

	if err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	return nil
}
