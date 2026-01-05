import { CoreLog } from "../../../domain/entities/coreLog";
import { UserGatewayDTO } from "../../../domain/gateways/user";
import { CoreLogRepository } from "../../../domain/repositories/coreLog";
import { CorePathnameRepository } from "../../../domain/repositories/corePathname";
import { RequestRepository } from "../../../domain/repositories/request";
import { ResponseRepository } from "../../../domain/repositories/response";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpMethod } from "../../../main/types/HttpMethod";

type InputProps = {
  status: number;
  method: HttpMethod;
  elapsedTime: number;
  trafficUserId: string | null;
  trafficSourceId: string;
  corePathnameId: string;
  requestId: string;
  responseId: string;
};

class CreateCoreLogUseCase {
  constructor(
    private coreLogRepository: CoreLogRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private corePathnameRepository: CorePathnameRepository,
    private requestRepository: RequestRepository,
    private responseRepository: ResponseRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const {
      trafficSourceId,
      corePathnameId,
      elapsedTime,
      method,
      requestId,
      responseId,
      status,
      trafficUserId,
    } = input;

    const [
      existsTrafficSource,
      existsCorePathname,
      existsRequest,
      existsResponse,
      user,
    ] = await Promise.all([
      await this.trafficSourceRepository.findById(trafficSourceId),
      await this.corePathnameRepository.findById(corePathnameId),
      await this.requestRepository.findById(requestId),
      await this.responseRepository.findById(responseId),
      await this.userGateway.findUnique(token),
    ]);

    if (!existsTrafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (!existsCorePathname) {
      throw HttpAdapter.notFound("Core pathname not found");
    }

    if (!existsRequest) {
      throw HttpAdapter.notFound("Request not found");
    }

    if (!existsResponse) {
      throw HttpAdapter.notFound("Response not found");
    }

    const coreLog = CoreLog.create({
      trafficSourceId,
      corePathnameId,
      elapsedTime,
      method,
      requestId,
      responseId,
      status,
      trafficUserId,
    });

    await this.coreLogRepository.createCoreLog(coreLog);

    return coreLog.toJson(user.utc);
  }
}

export { CreateCoreLogUseCase };
