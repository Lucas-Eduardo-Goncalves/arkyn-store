package repositories

import "github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"

type TrafficSourceRepository interface {
	FindAll(userId string) ([]*entities.TrafficSource, error)
	FindById(trafficSourceId string) (*entities.TrafficSource, error)
	FindByDomain(userId string, trafficSourceDomain string) (*entities.TrafficSource, error)
	Create(trafficSource *entities.TrafficSource) (*entities.TrafficSource, error)
	Update(trafficSource *entities.TrafficSource) (*entities.TrafficSource, error)
	Delete(trafficSource *entities.TrafficSource) error
}
