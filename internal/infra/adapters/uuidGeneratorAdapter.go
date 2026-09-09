package adapters

import "github.com/google/uuid"

type UuidGenerator struct{}

func (d *UuidGenerator) Generate() string {
	return uuid.NewString()
}
