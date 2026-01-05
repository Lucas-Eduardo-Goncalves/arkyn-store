import { UserGatewayDTO } from "../../../domain/gateways/user";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class ListTrafficSourceByIdUseCase {
  constructor(
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(trafficSourceId: string, token: string) {
    const [trafficSource, user] = await Promise.all([
      this.trafficSourceRepository.findById(trafficSourceId),
      this.userGateway.findUnique(token),
    ]);

    if (!trafficSource) throw HttpAdapter.notFound("Traffic Source not found");
    return trafficSource.toJson(user.utc);
  }
}

export { ListTrafficSourceByIdUseCase };
