import { CorePathname } from "../../../domain/entities/corePathname";
import { UserGatewayDTO } from "../../../domain/gateways/user";
import { CorePathnameRepository } from "../../../domain/repositories/corePathname";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  trafficSourceId: string;
  value: string;
};

class CreateCorePathnameUseCase {
  constructor(
    private corePathnameRepository: CorePathnameRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const { trafficSourceId, value } = input;

    const [existsTrafficSource, existsCorePathname, user] = await Promise.all([
      await this.trafficSourceRepository.findById(trafficSourceId),
      await this.corePathnameRepository.findByValue(value),
      await this.userGateway.findUnique(token),
    ]);

    if (!existsTrafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (existsCorePathname) return existsCorePathname.toJson(user.utc);

    const corePathname = CorePathname.create({
      trafficSourceId,
      value,
    });

    await this.corePathnameRepository.createCorePathname(corePathname);

    return corePathname.toJson(user.utc);
  }
}

export { CreateCorePathnameUseCase };
