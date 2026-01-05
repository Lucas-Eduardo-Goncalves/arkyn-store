import { UserGatewayDTO } from "../../../domain/gateways/user";
import { CoreLogRepository } from "../../../domain/repositories/coreLog";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { CoreLogSearchParams } from "../../search/coreLogSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    trafficSourceId: string;
  };
};

class ListCoreLogsUseCase {
  constructor(
    private coreLogRepository: CoreLogRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const searchParams = new CoreLogSearchParams(input);

    const [trafficSource, coreLogs, user] = await Promise.all([
      this.trafficSourceRepository.findById(input.filter.trafficSourceId),
      this.coreLogRepository.findAll(searchParams),
      this.userGateway.findUnique(token),
    ]);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== user.id) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    return coreLogs.toJson(user.utc);
  }
}

export { ListCoreLogsUseCase };
