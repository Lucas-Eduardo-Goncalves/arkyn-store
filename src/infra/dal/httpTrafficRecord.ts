import { HttpTrafficRecordSearchParams } from "../../app/search/httpTrafficRecordSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { HttpTrafficRecordDAL } from "../../domain/dal/httpTrafficRecord";
import { HttpTrafficRecord } from "../../domain/views/httpTrafficRecord";
import { databaseConnection } from "../adapters/dbAdapter";
import { HttpTrafficRecordMapper } from "../mappers/httpTrafficRecord";

class PrismaHttpTrafficRecordDAL implements HttpTrafficRecordDAL {
  async findAll(
    searchParams: HttpTrafficRecordSearchParams
  ): Promise<SearchResult<HttpTrafficRecord>> {
    const [httpTraffics, httpTrafficCount] = await Promise.all([
      databaseConnection.httpTraffic.findMany({
        ...searchParams.toPrisma(),
        include: {
          request: true,
          response: true,
          domain: true,
          pathname: true,
        },
      }),
      databaseConnection.httpTraffic.count({
        ...searchParams.toPrismaCount,
      }),
    ]);

    return new SearchResult<HttpTrafficRecord>({
      data: httpTraffics.map((httpTraffic) =>
        HttpTrafficRecordMapper.toView(httpTraffic)
      ),
      meta: {
        page: searchParams.page,
        pageLimit: searchParams.pageLimit,
        totalItems: httpTrafficCount,
      },
    });
  }

  async findById(id: string): Promise<HttpTrafficRecord | null> {
    const httpTraffic = await databaseConnection.httpTraffic.findUnique({
      where: { id },
      include: { request: true, response: true, domain: true, pathname: true },
    });

    if (!httpTraffic) {
      return null;
    }

    return HttpTrafficRecordMapper.toView(httpTraffic);
  }
}

export { PrismaHttpTrafficRecordDAL };
