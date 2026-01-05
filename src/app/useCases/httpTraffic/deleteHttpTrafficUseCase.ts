import { HttpTrafficRepository } from "../../../domain/repositories/httpTraffic";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class DeleteHttpTrafficUseCase {
  constructor(
    private httpTrafficRepository: HttpTrafficRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(httpTrafficId: string, userId: string) {
    const httpTraffic = await this.httpTrafficRepository.findById(
      httpTrafficId
    );

    if (!httpTraffic) {
      throw HttpAdapter.notFound("Http traffic not found");
    }

    const trafficSource = await this.trafficSourceRepository.findById(
      httpTraffic.trafficSourceId
    );

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    await this.httpTrafficRepository.deleteHttpTraffic(httpTraffic.id);
  }
}

export { DeleteHttpTrafficUseCase };
