import { TrafficSource } from "../../../domain/entities/trafficSource";
import { UserGatewayDTO } from "../../../domain/gateways/user";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  name: string;
  trafficDomain: string;
};

class CreateTrafficSourceUseCase {
  constructor(
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const { name, trafficDomain } = input;

    const [existsDomain, user] = await Promise.all([
      this.trafficSourceRepository.findByDomain(trafficDomain),
      this.userGateway.findUnique(token),
    ]);

    if (existsDomain) {
      throw HttpAdapter.conflict("Traffic domain already exists");
    }

    const trafficSource = TrafficSource.create({
      name,
      userId: user.id,
      trafficDomain,
    });

    await this.trafficSourceRepository.createTrafficSource(trafficSource);

    return trafficSource.toJson(user.utc);
  }
}

export { CreateTrafficSourceUseCase };
