package entities

import (
	"time"

	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/infra/adapters"
)

type TrafficSource struct {
	ID            string
	Name          string
	CreatedAt     time.Time
	UpdatedAt     time.Time
	TrafficDomain string
	UserId        string
}

type NewTrafficSourceInput struct {
	Name          string
	UserId        string
	TrafficDomain string
}

type UpdateTrafficSourceInput struct {
	Name          *string
	TrafficDomain *string
}

func NewTrafficSource(input *NewTrafficSourceInput) *TrafficSource {
	id := adapters.NewUuid()
	date := adapters.NewDate()

	return &TrafficSource{
		ID:            id,
		Name:          input.Name,
		CreatedAt:     date,
		UpdatedAt:     date,
		TrafficDomain: input.TrafficDomain,
		UserId:        input.UserId,
	}
}

func (t *TrafficSource) Update(input *UpdateTrafficSourceInput) {
	if input.Name != nil {
		t.Name = *input.Name
	}

	if input.TrafficDomain != nil {
		t.TrafficDomain = *input.TrafficDomain
	}
}
