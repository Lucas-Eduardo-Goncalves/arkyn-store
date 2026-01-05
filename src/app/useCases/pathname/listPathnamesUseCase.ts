import { UserGatewayDTO } from "../../../domain/gateways/user";
import { DomainRepository } from "../../../domain/repositories/domain";
import { PathnameRepository } from "../../../domain/repositories/pathname";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { PathnameSearchParams } from "../../search/pathnameSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    trafficSourceId: string;
    domainId: string;
  };
};

class ListPathnamesUseCase {
  constructor(
    private pathnameRepository: PathnameRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private domainRepository: DomainRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const searchParams = new PathnameSearchParams(input);

    const [trafficSource, domain, pathnames, user] = await Promise.all([
      this.trafficSourceRepository.findById(input.filter.trafficSourceId),
      this.domainRepository.findById(input.filter.domainId),
      this.pathnameRepository.findAll(searchParams),
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

    return pathnames.toJson(user.utc);
  }
}

export { ListPathnamesUseCase };
