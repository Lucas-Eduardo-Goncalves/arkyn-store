import { SearchParams } from "../shared/searchParams";

type Filter = {
  sharedWithId: string;
};

class SharedTrafficSourceSearchParams extends SearchParams<Filter> {}

export { SharedTrafficSourceSearchParams };
