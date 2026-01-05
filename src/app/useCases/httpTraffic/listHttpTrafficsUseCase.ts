import { UserGatewayDTO } from "../../../domain/gateways/user";
import { HttpTrafficRepository } from "../../../domain/repositories/httpTraffic";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpTrafficSearchParams } from "../../search/httpTrafficSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    trafficSourceId: string;
  };
};

class ListHttpTrafficsUseCase {
  constructor(
    private httpTrafficRepository: HttpTrafficRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const searchParams = new HttpTrafficSearchParams(input);

    const [trafficSource, httpTraffics, user] = await Promise.all([
      this.trafficSourceRepository.findById(input.filter.trafficSourceId),
      this.httpTrafficRepository.findAll(searchParams),
      this.userGateway.findUnique(token),
    ]);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== user.id) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    return httpTraffics.toJson(user.utc);
  }
}

export { ListHttpTrafficsUseCase };
