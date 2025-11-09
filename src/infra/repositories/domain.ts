import { DomainSearchParams } from "../../app/search/domainSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { Domain } from "../../domain/entities/domain";
import { DomainRepository } from "../../domain/repositories/domain";

import { databaseConnection } from "../adapters/dbAdapter";
import { DomainMapper } from "../mappers/domain";
import { CacheService } from "../service/cache";

class PrismaDomainRepository implements DomainRepository {
  async findAll(
    searchParams: DomainSearchParams
  ): Promise<SearchResult<Domain>> {
    const [domains, count] = await Promise.all([
      databaseConnection.domain.findMany(searchParams.toPrisma()),
      databaseConnection.domain.count({
        where: searchParams.toPrisma().where,
      }),
    ]);

    return new SearchResult({
      data: domains.map(DomainMapper.toEntity),
      meta: {
        page: searchParams.page,
        pageLimit: searchParams.pageLimit,
        totalItems: count,
      },
    });
  }

  async findById(domainId: string): Promise<Domain | null> {
    const cached = CacheService.get<Domain>(domainId);
    if (cached) return DomainMapper.toEntity(cached);

    const domain = await databaseConnection.domain.findUnique({
      where: { id: domainId },
    });

    if (!domain) return null;

    CacheService.set(domainId, domain);
    return DomainMapper.toEntity(domain);
  }

  async findByValue(value: string): Promise<Domain | null> {
    const domain = await databaseConnection.domain.findFirst({
      where: { value },
    });

    if (!domain) return null;
    return DomainMapper.toEntity(domain);
  }

  async createDomain(domain: Domain): Promise<Domain> {
    await databaseConnection.domain.create({ data: domain });
    return domain;
  }

  async deleteDomain(domainId: string): Promise<void> {
    await databaseConnection.domain.delete({
      where: { id: domainId },
    });
  }
}

export { PrismaDomainRepository };
