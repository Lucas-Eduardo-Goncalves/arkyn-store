import { PathnameRepository } from "../../../domain/repositories/pathname";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class DeletePathnameUseCase {
  constructor(
    private pathnameRepository: PathnameRepository,
    private trafficSourceRepository: TrafficSourceRepository,
  ) {}

  async execute(pathnameId: string, userId: string) {
    const pathname = await this.pathnameRepository.findById(pathnameId);

    if (!pathname) {
      throw HttpAdapter.notFound("Pathname not found");
    }

    const trafficSource = await this.trafficSourceRepository.findById(
      pathname.trafficSourceId,
    );

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    await this.pathnameRepository.deletePathname(pathname.id);
  }
}

export { DeletePathnameUseCase };
