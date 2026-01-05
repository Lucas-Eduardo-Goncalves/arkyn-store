import { HttpTrafficRecordDAL } from "../../../domain/dal/httpTrafficRecord";
import { UserGatewayDTO } from "../../../domain/gateways/user";

class ListHttpTrafficRecordUseCase {
  constructor(
    private httpTrafficRecordDAL: HttpTrafficRecordDAL,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(httpTrafficId: string, token: string) {
    const [httpTrafficRecord, user] = await Promise.all([
      this.httpTrafficRecordDAL.findById(httpTrafficId),
      this.userGateway.findUnique(token),
    ]);

    if (!httpTrafficRecord) return null;
    return httpTrafficRecord.toJson(user.utc);
  }
}

export { ListHttpTrafficRecordUseCase };
