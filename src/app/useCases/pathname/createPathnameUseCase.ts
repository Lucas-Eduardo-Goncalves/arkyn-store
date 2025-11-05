import { Pathname } from "../../../domain/entities/pathname";
import { DomainRepository } from "../../../domain/repositories/domain";
import { PathnameRepository } from "../../../domain/repositories/pathname";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  trafficSourceId: string;
  domainId: string;
  value: string;
};

class CreatePathnameUseCase {
  constructor(
    private pathnameRepository: PathnameRepository,
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps, userId: string) {
    const { trafficSourceId, domainId, value } = input;

    const [trafficSource, domain, pathname] = await Promise.all([
      await this.trafficSourceRepository.findById(trafficSourceId),
      await this.domainRepository.findById(domainId),
      await this.pathnameRepository.findUnique(
        value,
        trafficSourceId,
        domainId
      ),
    ]);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    if (!domain) {
      throw HttpAdapter.notFound("Domain not found");
    }

    if (pathname) return pathname.toJson();

    const newPathname = Pathname.create({ trafficSourceId, domainId, value });
    await this.pathnameRepository.createPathname(newPathname);

    return newPathname.toJson();
  }
}

export { CreatePathnameUseCase };
