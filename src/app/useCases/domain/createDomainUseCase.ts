import { Domain } from "../../../domain/entities/domain";
import { UserGatewayDTO } from "../../../domain/gateways/user";
import { DomainRepository } from "../../../domain/repositories/domain";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  trafficSourceId: string;
  value: string;
  protocol: "http" | "https";
};

class CreateDomainUseCase {
  constructor(
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  normalizeValue(value: string): string {
    return value.endsWith("/") ? value.slice(0, -1) : value;
  }

  async execute(input: InputProps, token: string) {
    const { trafficSourceId, value, protocol } = input;

    const [trafficSource, domain, user] = await Promise.all([
      await this.trafficSourceRepository.findById(trafficSourceId),
      await this.domainRepository.findByValue(value),
      await this.userGateway.findUnique(token),
    ]);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== user.id) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    if (domain) return domain.toJson(user.utc);

    const newDomain = Domain.create({
      trafficSourceId,
      value: this.normalizeValue(value),
      protocol,
    });

    await this.domainRepository.createDomain(newDomain);

    return newDomain.toJson(user.utc);
  }
}

export { CreateDomainUseCase };
