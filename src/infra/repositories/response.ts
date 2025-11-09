import { ResponseSearchParams } from "../../app/search/responseSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { Response } from "../../domain/entities/response";
import { ResponseRepository } from "../../domain/repositories/response";
import { databaseConnection } from "../adapters/dbAdapter";
import { ResponseMapper } from "../mappers/response";
import { CacheService } from "../service/cache";

class PrismaResponseRepository implements ResponseRepository {
  async findAll(
    searchParams: ResponseSearchParams
  ): Promise<SearchResult<Response>> {
    const [responses, count] = await Promise.all([
      databaseConnection.response.findMany(searchParams.toPrisma()),
      databaseConnection.response.count({
        where: searchParams.toPrisma().where,
      }),
    ]);

    return new SearchResult({
      data: responses.map(ResponseMapper.toEntity),
      meta: {
        page: searchParams.page,
        pageLimit: searchParams.pageLimit,
        totalItems: count,
      },
    });
  }

  async findById(responseId: string): Promise<Response | null> {
    const cached = CacheService.get<Response>(responseId);
    if (cached) return ResponseMapper.toEntity(cached);

    const response = await databaseConnection.response.findUnique({
      where: { id: responseId },
    });

    if (!response) return null;

    CacheService.set(responseId, response);
    return ResponseMapper.toEntity(response);
  }

  async createResponse(response: Response): Promise<Response> {
    await databaseConnection.response.create({
      data: ResponseMapper.toDatabase(response),
    });

    return response;
  }

  async deleteResponse(responseId: string): Promise<void> {
    await databaseConnection.response.delete({
      where: { id: responseId },
    });
  }
}

export { PrismaResponseRepository };
