import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class ListTrafficSourceByIdUseCase {
  constructor(private trafficSourceRepository: TrafficSourceRepository) {}

  async execute(trafficSourceId: string) {
    const trafficSource = await this.trafficSourceRepository.findById(
      trafficSourceId
    );

    if (!trafficSource) throw HttpAdapter.notFound("Traffic Source not found");
    return trafficSource.toJson();
  }
}

export { ListTrafficSourceByIdUseCase };
