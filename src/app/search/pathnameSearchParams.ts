import { SearchParams } from "../shared/searchParams";

type Filter = {
  trafficSourceId: string;
  domainId: string;
  value?: string;
};

class PathnameSearchParams extends SearchParams<Filter> {}

export { PathnameSearchParams };
