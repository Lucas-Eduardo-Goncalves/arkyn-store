import { UserGatewayDTO } from "../../../domain/gateways/user";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { TrafficSourceSearchParams } from "../../search/trafficSourceSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";
};

class ListTrafficSourcesUseCase {
  constructor(
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const user = await this.userGateway.findUnique(token);

    const searchParams = new TrafficSourceSearchParams({
      ...input,
      filter: { userId: user.id },
    });

    const trafficSources = await this.trafficSourceRepository.findAll(
      searchParams
    );

    return trafficSources.toJson(user.utc);
  }
}

export { ListTrafficSourcesUseCase };
