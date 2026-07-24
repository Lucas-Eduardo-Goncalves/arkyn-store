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
};

class HttpTrafficRecordSearchParams extends SearchParams<Filter> {
  private buildWhere(): Record<string, any> | undefined {
    if (!this.filter) return undefined;

    const { startDate, endDate, ...rest } = this.filter;
    const where: Record<string, any> = { ...rest };

    if (startDate || endDate) {
      where.createdAt = {
        ...(startDate ? { gte: startDate } : {}),
        ...(endDate ? { lte: endDate } : {}),
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
