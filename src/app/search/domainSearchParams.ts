import { SearchParams } from "../shared/searchParams";

type Filter = {
  trafficSourceId: string;
  protocol?: "http" | "https";
  value?: string;
};

class DomainSearchParams extends SearchParams<Filter> {}

export { DomainSearchParams };
