import { HttpMethod } from "../../main/types/HttpMethod";
import { SearchParams } from "../shared/searchParams";

type Filter = {
  method?: HttpMethod;
  level?: "info" | "warning" | "fatal";
  trafficSourceId: string;
  status?: number;
  protocol?: "http" | "https";
};

class HttpTrafficRecordSearchParams extends SearchParams<Filter> {}

export { HttpTrafficRecordSearchParams };
