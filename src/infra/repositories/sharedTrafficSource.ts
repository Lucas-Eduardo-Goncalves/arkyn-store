import { SharedTrafficSourceSearchParams } from "../../app/search/sharedTrafficSourceSearchParams";
import { SharedTrafficSource } from "../../domain/entities/sharedTrafficSource";
import { SharedTrafficSourceRepository } from "../../domain/repositories/sharedTrafficSource";
import { databaseConnection } from "../adapters/dbAdapter";
import { SharedTrafficSourceMapper } from "../mappers/sharedTrafficSource";

class PrismaSharedTrafficSourceRepository implements SharedTrafficSourceRepository {
  async findAll(
    searchParams: SharedTrafficSourceSearchParams,
  ): Promise<SharedTrafficSource[]> {
    const sharedTrafficSources =
      await databaseConnection.sharedTrafficSource.findMany({
        ...searchParams.toPrisma(),
        include: { trafficSource: true },
      });

    return sharedTrafficSources.map(SharedTrafficSourceMapper.toEntity);
  }

  async findById(
    sharedTrafficSourceId: string,
  ): Promise<SharedTrafficSource | null> {
    const sharedTrafficSource =
      await databaseConnection.sharedTrafficSource.findUnique({
        where: { id: sharedTrafficSourceId },
        include: { trafficSource: true },
      });

    if (!sharedTrafficSource) return null;
    return SharedTrafficSourceMapper.toEntity(sharedTrafficSource);
  }

  async findByTrafficSourceIdWithSharedWithId(
    trafficSourceId: string,
    sharedWithId: string,
  ): Promise<SharedTrafficSource | null> {
    const sharedTrafficSource =
      await databaseConnection.sharedTrafficSource.findFirst({
        where: { trafficSourceId, sharedWithId, NOT: { status: "rejected" } },
        include: { trafficSource: true },
      });

    if (!sharedTrafficSource) return null;
    return SharedTrafficSourceMapper.toEntity(sharedTrafficSource);
  }

  async createSharedTrafficSource(
    sharedTrafficSource: SharedTrafficSource,
  ): Promise<SharedTrafficSource> {
    await databaseConnection.sharedTrafficSource.create({
      data: {
        createdAt: sharedTrafficSource.createdAt,
        id: sharedTrafficSource.id,
        permission: sharedTrafficSource.permission,
        sharedWithId: sharedTrafficSource.sharedWithId,
        status: sharedTrafficSource.status,
        trafficSourceId: sharedTrafficSource.trafficSource.id,
        updatedAt: sharedTrafficSource.updatedAt,
        userId: sharedTrafficSource.userId,
      },
    });

    return sharedTrafficSource;
  }

  async updateSharedTrafficSource(
    sharedTrafficSource: SharedTrafficSource,
  ): Promise<SharedTrafficSource> {
    await databaseConnection.sharedTrafficSource.update({
      where: { id: sharedTrafficSource.id },
      data: {
        createdAt: sharedTrafficSource.createdAt,
        id: sharedTrafficSource.id,
        permission: sharedTrafficSource.permission,
        sharedWithId: sharedTrafficSource.sharedWithId,
        status: sharedTrafficSource.status,
        trafficSourceId: sharedTrafficSource.trafficSource.id,
        updatedAt: sharedTrafficSource.updatedAt,
        userId: sharedTrafficSource.userId,
      },
    });

    return sharedTrafficSource;
  }
}

export { PrismaSharedTrafficSourceRepository };
