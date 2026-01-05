import { Pathname } from "../../../domain/entities/pathname";
import { UserGatewayDTO } from "../../../domain/gateways/user";
import { DomainRepository } from "../../../domain/repositories/domain";
import { PathnameRepository } from "../../../domain/repositories/pathname";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  trafficSourceId: string;
  domainId: string;
  value: string;
};

class CreatePathnameUseCase {
  constructor(
    private pathnameRepository: PathnameRepository,
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const { trafficSourceId, domainId, value } = input;

    const [trafficSource, domain, pathname, user] = await Promise.all([
      this.trafficSourceRepository.findById(trafficSourceId),
      this.domainRepository.findById(domainId),
      this.pathnameRepository.findUnique(value, domainId, trafficSourceId),
      this.userGateway.findUnique(token),
    ]);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== user.id) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    if (!domain) {
      throw HttpAdapter.notFound("Domain not found");
    }

    if (pathname) return pathname.toJson(user.utc);

    const newPathname = Pathname.create({ trafficSourceId, domainId, value });
    await this.pathnameRepository.createPathname(newPathname);

    return newPathname.toJson(user.utc);
  }
}

export { CreatePathnameUseCase };
