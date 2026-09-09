package adapters

import "time"

type DateGenerator struct{}

func (d *DateGenerator) Now() time.Time {
	return time.Now()
}
