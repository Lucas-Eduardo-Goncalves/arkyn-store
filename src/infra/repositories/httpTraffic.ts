import { HttpTrafficSearchParams } from "../../app/search/httpTrafficSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { HttpTraffic } from "../../domain/entities/httpTraffic";
import { HttpTrafficRepository } from "../../domain/repositories/httpTraffic";

import { databaseConnection } from "../adapters/dbAdapter";
import { HttpTrafficMapper } from "../mappers/httpTraffic";
import { CacheService } from "../service/cache";

class PrismaHttpTrafficRepository implements HttpTrafficRepository {
  async findAll(
    searchParams: HttpTrafficSearchParams
  ): Promise<SearchResult<HttpTraffic>> {
    const [httpTraffics, count] = await Promise.all([
      databaseConnection.httpTraffic.findMany(searchParams.toPrisma()),
      databaseConnection.httpTraffic.count({
        where: searchParams.toPrisma().where,
      }),
    ]);

    return new SearchResult({
      data: httpTraffics.map(HttpTrafficMapper.toEntity),
      meta: {
        page: searchParams.page,
        pageLimit: searchParams.pageLimit,
        totalItems: count,
      },
    });
  }

  async findById(httpTrafficId: string): Promise<HttpTraffic | null> {
    const cached = CacheService.get<HttpTraffic>(httpTrafficId);
    if (cached) return HttpTrafficMapper.toEntity(cached);

    const httpTraffic = await databaseConnection.httpTraffic.findUnique({
      where: { id: httpTrafficId },
    });

    if (!httpTraffic) return null;

    CacheService.set(httpTrafficId, httpTraffic);
    return HttpTrafficMapper.toEntity(httpTraffic);
  }

  async createHttpTraffic(httpTraffic: HttpTraffic): Promise<HttpTraffic> {
    await databaseConnection.httpTraffic.create({ data: httpTraffic });
    return httpTraffic;
  }

  async deleteHttpTraffic(httpTrafficId: string): Promise<void> {
    await databaseConnection.httpTraffic.delete({
      where: { id: httpTrafficId },
    });
  }
}

export { PrismaHttpTrafficRepository };
