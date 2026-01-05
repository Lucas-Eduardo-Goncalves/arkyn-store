import { UserGatewayDTO } from "../../../domain/gateways/user";
import { DomainRepository } from "../../../domain/repositories/domain";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { DomainSearchParams } from "../../search/domainSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    trafficSourceId: string;
  };
};

class ListDomainsUseCase {
  constructor(
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const searchParams = new DomainSearchParams(input);

    const [trafficSource, domains, user] = await Promise.all([
      this.trafficSourceRepository.findById(input.filter.trafficSourceId),
      this.domainRepository.findAll(searchParams),
      this.userGateway.findUnique(token),
    ]);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== user.id) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    return domains.toJson(user.utc);
  }
}

export { ListDomainsUseCase };
