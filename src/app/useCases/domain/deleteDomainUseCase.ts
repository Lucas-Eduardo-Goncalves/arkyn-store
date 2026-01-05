import { DomainRepository } from "../../../domain/repositories/domain";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class DeleteDomainUseCase {
  constructor(
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(domainId: string, userId: string) {
    const domain = await this.domainRepository.findById(domainId);

    if (!domain) {
      throw HttpAdapter.notFound("Domain not found");
    }

    const trafficSource = await this.trafficSourceRepository.findById(
      domain.trafficSourceId
    );

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    await this.domainRepository.deleteDomain(domain.id);
  }
}

export { DeleteDomainUseCase };
