import { HttpMethod } from "../../main/types/HttpMethod";
import { SearchParams } from "../shared/searchParams";

type Filter = {
  method?: HttpMethod;
  level?: "info" | "warning" | "fatal";
  trafficSourceId: string;
  status?: number;
  id?: string;
};

class HttpTrafficSearchParams extends SearchParams<Filter> {}

export { HttpTrafficSearchParams };
