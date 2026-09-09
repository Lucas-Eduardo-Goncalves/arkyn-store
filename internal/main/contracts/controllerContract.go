package contracts

import (
	"net/http"

	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/adapters"
)

type Controller interface {
	Handle(w http.ResponseWriter, r *http.Request) error
}

func Adapt(controller Controller) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := controller.Handle(w, r); err != nil {
			adapters.HandleError(w, err)
		}
	}
}
