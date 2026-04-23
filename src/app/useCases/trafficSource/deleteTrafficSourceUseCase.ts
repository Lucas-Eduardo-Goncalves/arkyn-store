import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";

class DeleteTrafficSourceUseCase {
  constructor(private trafficSourceRepository: TrafficSourceRepository) {}

  async execute(trafficSourceId: string, userId: string) {
    const trafficSource =
      await this.trafficSourceRepository.findById(trafficSourceId);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    await this.trafficSourceRepository.deleteTrafficSource(trafficSource.id);
  }
}

export { DeleteTrafficSourceUseCase };
