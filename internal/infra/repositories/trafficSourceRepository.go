package trafficSourceRepositories

import (
	"errors"
	"sync"

	"github.com/Lucas-Eduardo-Goncalves/arkyn-store/internal/domain/entities"
)

type InMemoryTrafficSourceRepository struct {
	mu   sync.Mutex
	data map[string]*entities.TrafficSource
}

func NewInMemoryTrafficSourceRepository() *InMemoryTrafficSourceRepository {
	return &InMemoryTrafficSourceRepository{data: make(map[string]*entities.TrafficSource)}
}

func (r *InMemoryTrafficSourceRepository) FindAll(userId string) ([]*entities.TrafficSource, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	trafficSources := []*entities.TrafficSource{}
	for _, trafficSource := range r.data {
		if trafficSource.UserId == userId {
			trafficSources = append(trafficSources, trafficSource)
		}
	}

	return trafficSources, nil
}

func (r *InMemoryTrafficSourceRepository) FindById(trafficSourceId string) (*entities.TrafficSource, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	trafficSource, ok := r.data[trafficSourceId]
	if !ok {
		return nil, errors.New("traffic source not found")
	}

	return trafficSource, nil
}

func (r *InMemoryTrafficSourceRepository) FindByDomain(userId string, trafficSourceDomain string) (*entities.TrafficSource, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	for _, trafficSource := range r.data {
		if trafficSource.UserId == userId && trafficSource.TrafficDomain == trafficSourceDomain {
			return trafficSource, nil
		}
	}

	return nil, errors.New("traffic source not found")
}

func (r *InMemoryTrafficSourceRepository) Create(trafficSource *entities.TrafficSource) (*entities.TrafficSource, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.data[trafficSource.ID] = trafficSource
	return trafficSource, nil
}

func (r *InMemoryTrafficSourceRepository) Update(trafficSource *entities.TrafficSource) (*entities.TrafficSource, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.data[trafficSource.ID] = trafficSource
	return trafficSource, nil
}

func (r *InMemoryTrafficSourceRepository) Delete(trafficSource *entities.TrafficSource) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	delete(r.data, trafficSource.ID)
	return nil
}
