package webhookControllers

import (
	"encoding/json"
	"net/http"

	webhookUseCases "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/app/useCases/webhook"
	"github.com/go-playground/validator/v10"
)

type CreateWebhookController struct {
	createWebhookUseCase webhookUseCases.CreateWebhookUseCase
}

func (c *CreateWebhookController) Handle(w http.ResponseWriter, r *http.Request) error {
	var input webhookUseCases.CreateWebhookUseCaseInput

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	if error := decoder.Decode(&input); error != nil {
		return error
	}

	validate := validator.New()

	if error := validate.Struct(input); error != nil {
		return error
	}

	return nil
}
