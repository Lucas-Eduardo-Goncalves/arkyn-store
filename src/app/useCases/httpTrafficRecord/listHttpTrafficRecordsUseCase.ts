import { HttpTrafficRecordDAL } from "../../../domain/dal/httpTrafficRecord";
import { UserGatewayDTO } from "../../../domain/gateways/user";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpMethod } from "../../../main/types/HttpMethod";
import { HttpTrafficRecordSearchParams } from "../../search/httpTrafficRecordSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    requestHeaders?: any;
    requestBody?: any;
    responseHeaders?: any;
    responseBody?: any;
    queryParams?: any;
    method?: HttpMethod;
    level?: "info" | "warning" | "fatal";
    trafficSourceId: string;
    status?: number;
    protocol?: "http" | "https";
  };
};

class ListHttpTrafficRecordsUseCase {
  constructor(
    private httpTrafficRecordDAL: HttpTrafficRecordDAL,
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const searchParams = new HttpTrafficRecordSearchParams(input);

    const [trafficSource, httpTraffics, user] = await Promise.all([
      this.trafficSourceRepository.findById(input.filter.trafficSourceId),
      this.httpTrafficRecordDAL.findAll(searchParams),
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

export { ListHttpTrafficRecordsUseCase };
