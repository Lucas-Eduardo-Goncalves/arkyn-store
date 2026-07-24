import { HttpMethod } from "../../main/types/HttpMethod";
import { SearchParams } from "../shared/searchParams";

type Filter = {
  method?: HttpMethod;
  level?: "info" | "warning" | "fatal";
  trafficSourceId: string;
  status?: number;
  protocol?: "http" | "https";
  domainId?: string;
  pathnameId?: string;
  startDate?: Date;
  endDate?: Date;
  requestBodyPreview?: string;
  responseBodyPreview?: string;
};

class HttpTrafficRecordSearchParams extends SearchParams<Filter> {
  private escapeForStoredJson(value: string): string {
    return JSON.stringify(value).slice(1, -1);
  }

  private buildWhere(): Record<string, any> | undefined {
    if (!this.filter) return undefined;

    const {
      startDate,
      endDate,
      requestBodyPreview,
      responseBodyPreview,
      ...rest
    } = this.filter;
    const where: Record<string, any> = { ...rest };

    if (startDate || endDate) {
      where.createdAt = {
        ...(startDate ? { gte: startDate } : {}),
        ...(endDate ? { lte: endDate } : {}),
      };
    }

    if (requestBodyPreview) {
      where.request = {
        bodyPreview: { contains: this.escapeForStoredJson(requestBodyPreview) },
      };
    }

    if (responseBodyPreview) {
      where.response = {
        bodyPreview: {
          contains: this.escapeForStoredJson(responseBodyPreview),
        },
      };
    }

    return where;
  }

  toPrisma() {
    return { ...super.toPrisma(), where: this.buildWhere() };
  }

  toPrismaCount() {
    return { where: this.buildWhere() };
  }
}

export { HttpTrafficRecordSearchParams };
