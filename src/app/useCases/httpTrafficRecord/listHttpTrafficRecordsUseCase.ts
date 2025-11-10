import { HttpTrafficRecordDAL } from "../../../domain/dal/httpTrafficRecord";
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
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps, userId: string) {
    const searchParams = new HttpTrafficRecordSearchParams(input);

    const trafficSource = await this.trafficSourceRepository.findById(
      input.filter.trafficSourceId
    );

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    const httpTraffics = await this.httpTrafficRecordDAL.findAll(searchParams);
    return httpTraffics.toJson();
  }
}

export { ListHttpTrafficRecordsUseCase };
