import { UserGatewayDTO } from "../../../domain/gateways/user";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  trafficSourceId: string;
  name?: string;
  trafficDomain?: string;
};

class UpdateTrafficSourceUseCase {
  constructor(
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const { trafficSourceId, name, trafficDomain } = input;

    const [trafficSource, user] = await Promise.all([
      this.trafficSourceRepository.findById(trafficSourceId),
      this.userGateway.findUnique(token),
    ]);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== user.id) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    trafficSource.update({ name, trafficDomain });

    await this.trafficSourceRepository.updateTrafficSource(trafficSource);

    return trafficSource.toJson(user.utc);
  }
}

export { UpdateTrafficSourceUseCase };
