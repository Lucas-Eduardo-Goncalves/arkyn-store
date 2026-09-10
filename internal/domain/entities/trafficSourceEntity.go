package entities

import (
	"time"

	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/providers"
)

type TrafficSource struct {
	ID            string
	Name          string
	CreatedAt     time.Time
	UpdatedAt     time.Time
	TrafficDomain string
	UserId        string
}

type RestoreTrafficSourceInput struct {
	ID            string
	Name          string
	CreatedAt     time.Time
	UpdatedAt     time.Time
	TrafficDomain string
	UserId        string
}

type ResponseTrafficSource struct {
	ID            string    `json:"id"`
	Name          string    `json:"name"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
	TrafficDomain string    `json:"trafficDomain"`
}

type NewTrafficSourceInput struct {
	Name          string
	UserId        string
	TrafficDomain string
}

type UpdateTrafficSourceInput struct {
	Name          *string
	TrafficDomain *string
	UpdatedAt     time.Time
}

func NewTrafficSource(
	input *NewTrafficSourceInput,
	uuidGenerator providers.UuidGenerator,
	dateGenerator providers.DateGenerator,
) *TrafficSource {
	uuid := uuidGenerator.Generate()
	date := dateGenerator.Now()

	return &TrafficSource{
		ID:            uuid,
		Name:          input.Name,
		CreatedAt:     date,
		UpdatedAt:     date,
		TrafficDomain: input.TrafficDomain,
		UserId:        input.UserId,
	}
}

func RestoreTrafficSource(input *RestoreTrafficSourceInput) *TrafficSource {
	return &TrafficSource{
		ID:            input.ID,
		Name:          input.Name,
		CreatedAt:     input.CreatedAt,
		UpdatedAt:     input.UpdatedAt,
		TrafficDomain: input.TrafficDomain,
		UserId:        input.UserId,
	}
}

func (t *TrafficSource) Update(input *UpdateTrafficSourceInput) {
	changed := false

	if input.Name != nil {
		t.Name = *input.Name
		changed = true
	}

	if input.TrafficDomain != nil {
		t.TrafficDomain = *input.TrafficDomain
		changed = true
	}

	if changed == true {
		t.UpdatedAt = input.UpdatedAt
	}
}

func (t *TrafficSource) ToResponse() *ResponseTrafficSource {
	return &ResponseTrafficSource{
		ID:            t.ID,
		Name:          t.Name,
		CreatedAt:     t.CreatedAt,
		UpdatedAt:     t.UpdatedAt,
		TrafficDomain: t.TrafficDomain,
	}
}
