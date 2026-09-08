package webhookUseCases

import (
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/repositories"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/templates"
)

type CreateWebhookUseCase struct {
	webhookRepository repositories.WebhookRepository
}

type CreateWebhookUseCaseInput struct {
	Level           templates.WebhookLevel
	Type            templates.WebhookType
	Value           string
	TrafficSourceId string
}

func (c *CreateWebhookUseCase) Handle(input *CreateWebhookUseCaseInput) (*entities.Webhook, error) {
	webhook := entities.NewWebhook(&entities.NewWebhookInput{
		Level:           input.Level,
		Type:            input.Type,
		Value:           input.Value,
		TrafficSourceId: input.TrafficSourceId,
	})

	return c.webhookRepository.Create(webhook)
}
