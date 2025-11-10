import { TrafficSourceSearchParams } from "../../app/search/trafficSourceSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { TrafficSource } from "../../domain/entities/trafficSource";
import { TrafficSourceRepository } from "../../domain/repositories/trafficSource";
import { databaseConnection } from "../adapters/dbAdapter";
import { TrafficSourceMapper } from "../mappers/trafficSource";
import { CacheService } from "../service/cache";

class PrismaTrafficSourceRepository implements TrafficSourceRepository {
  async findAll(
    searchParams: TrafficSourceSearchParams
  ): Promise<SearchResult<TrafficSource>> {
    const [trafficSources, count] = await Promise.all([
      databaseConnection.trafficSource.findMany(searchParams.toPrisma()),
      databaseConnection.trafficSource.count({
        where: searchParams.toPrisma().where,
      }),
    ]);

    return new SearchResult({
      data: trafficSources.map(TrafficSourceMapper.toEntity),
      meta: {
        page: searchParams.page,
        pageLimit: searchParams.pageLimit,
        totalItems: count,
      },
    });
  }

  async findById(trafficSourceId: string): Promise<TrafficSource | null> {
    const cached = CacheService.get<TrafficSource>(trafficSourceId);
    if (cached) return TrafficSourceMapper.toEntity(cached);

    const trafficSource = await databaseConnection.trafficSource.findUnique({
      where: { id: trafficSourceId },
    });

    if (!trafficSource) return null;

    CacheService.set(trafficSourceId, trafficSource);
    return TrafficSourceMapper.toEntity(trafficSource);
  }

  async findByDomain(
    trafficSourceDomain: string
  ): Promise<TrafficSource | null> {
    const trafficSource = await databaseConnection.trafficSource.findFirst({
      where: { trafficDomain: trafficSourceDomain },
    });

    if (!trafficSource) return null;
    return TrafficSourceMapper.toEntity(trafficSource);
  }

  async createTrafficSource(
    trafficSource: TrafficSource
  ): Promise<TrafficSource> {
    await databaseConnection.trafficSource.create({ data: trafficSource });
    return trafficSource;
  }

  async updateTrafficSource(
    trafficSource: TrafficSource
  ): Promise<TrafficSource> {
    await databaseConnection.trafficSource.update({
      data: trafficSource,
      where: { id: trafficSource.id },
    });

    return trafficSource;
  }

  async deleteTrafficSource(trafficSourceId: string): Promise<void> {
    await databaseConnection.trafficSource.delete({
      where: { id: trafficSourceId },
    });
  }
}

export { PrismaTrafficSourceRepository };
