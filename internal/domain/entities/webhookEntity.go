package entities

import (
	"time"

	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/adapters"
	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/main/templates"
)

type Webhook struct {
	ID              string
	Level           templates.WebhookLevel
	Type            templates.WebhookType
	Value           string
	TrafficSourceId string
	CreatedAt       time.Time
	UpdatedAt       time.Time
}

type NewWebhookInput struct {
	Level           templates.WebhookLevel
	Type            templates.WebhookType
	Value           string
	TrafficSourceId string
}

type UpdateWebhookInput struct {
	Level *templates.WebhookLevel
	Type  *templates.WebhookType
	Value *string
}

func NewWebhook(input *NewWebhookInput) *Webhook {
	id := adapters.NewUuid()
	date := adapters.NewDate()

	return &Webhook{
		ID:              id,
		Level:           input.Level,
		Type:            input.Type,
		Value:           input.Value,
		TrafficSourceId: input.TrafficSourceId,
		CreatedAt:       date,
		UpdatedAt:       date,
	}
}

func (w *Webhook) Update(input *UpdateWebhookInput) {
	if input.Level != nil {
		w.Level = *input.Level
	}

	if input.Type != nil {
		w.Type = *input.Type
	}

	if input.Value != nil {
		w.Value = *input.Value
	}

	w.UpdatedAt = adapters.NewDate()
}
