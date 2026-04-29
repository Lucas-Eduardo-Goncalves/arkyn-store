import { SearchParams } from "../shared/searchParams";

type Filter = {
  userId: string;
  sharedWithId: string;
};

class TrafficSourceSearchParams extends SearchParams<Filter> {}

export { TrafficSourceSearchParams };
