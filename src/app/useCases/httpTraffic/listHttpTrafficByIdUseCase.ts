import { UserGatewayDTO } from "../../../domain/gateways/user";
import { HttpTrafficRepository } from "../../../domain/repositories/httpTraffic";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class ListHttpTrafficByIdUseCase {
  constructor(
    private httpTrafficRepository: HttpTrafficRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(httpTrafficId: string, token: string) {
    const [httpTraffic, user] = await Promise.all([
      this.httpTrafficRepository.findById(httpTrafficId),
      this.userGateway.findUnique(token),
    ]);

    if (!httpTraffic) {
      throw HttpAdapter.notFound("HTTP Traffic not found");
    }

    return httpTraffic.toJson(user.utc);
  }
}

export { ListHttpTrafficByIdUseCase };
