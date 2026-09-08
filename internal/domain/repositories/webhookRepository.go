package repositories

import "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"

type WebhookRepository interface {
	FindAll(trafficSourceId string) ([]*entities.Webhook, error)
	FindById(webhookId string) (*entities.Webhook, error)
	Create(webhook *entities.Webhook) (*entities.Webhook, error)
	Update(webhook *entities.Webhook) (*entities.Webhook, error)
	Delete(webhook *entities.Webhook) error
}
