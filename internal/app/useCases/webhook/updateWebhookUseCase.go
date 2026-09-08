package webhookUseCases

import (
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/templates"
)

type UpdateUseCase struct {
	webhookRepository repositories.WebhookRepository
}

type UpdateUseCaseInput struct {
	ID    string
	Level *templates.WebhookLevel
	Type  *templates.WebhookType
	Value *string
}

func (u *UpdateUseCase) Handle(input *UpdateUseCaseInput) (*entities.Webhook, error) {
	webhook, error := u.webhookRepository.FindById(input.ID)

	if error != nil {
		return nil, error
	}

	webhook.Update(&entities.UpdateWebhookInput{
		Level: input.Level,
		Type:  input.Type,
		Value: input.Value,
	})

	updatedWebhook, updatedError := u.webhookRepository.Update(webhook)

	if updatedError != nil {
		return nil, updatedError
	}

	return updatedWebhook, nil
}
