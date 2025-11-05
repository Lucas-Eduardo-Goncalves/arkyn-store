import { HttpTrafficRepository } from "../../../domain/repositories/httpTraffic";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class ListHttpTrafficByIdUseCase {
  constructor(private httpTrafficRepository: HttpTrafficRepository) {}

  async execute(httpTrafficId: string) {
    const httpTraffic = await this.httpTrafficRepository.findById(
      httpTrafficId
    );

    if (!httpTraffic) {
      throw HttpAdapter.notFound("HTTP Traffic not found");
    }

    return httpTraffic.toJson();
  }
}

export { ListHttpTrafficByIdUseCase };
