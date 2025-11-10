import { TrafficSource } from "../../../domain/entities/trafficSource";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  name: string;
  userId: string;
  trafficDomain: string;
};

class CreateTrafficSourceUseCase {
  constructor(private trafficSourceRepository: TrafficSourceRepository) {}

  async execute(input: InputProps) {
    const { name, trafficDomain, userId } = input;

    const existsDomain = await this.trafficSourceRepository.findByDomain(
      trafficDomain
    );

    if (existsDomain) {
      throw HttpAdapter.conflict("Traffic domain already exists");
    }

    const trafficSource = TrafficSource.create({ name, userId, trafficDomain });
    await this.trafficSourceRepository.createTrafficSource(trafficSource);

    return trafficSource.toJson();
  }
}

export { CreateTrafficSourceUseCase };
