import { PathnameSearchParams } from "../../app/search/pathnameSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { Pathname } from "../entities/pathname";

type PathnameRepository = {
  findAll: (
    searchParams: PathnameSearchParams
  ) => Promise<SearchResult<Pathname>>;
  findById: (pathnameId: string) => Promise<Pathname | null>;
  findUnique: (
    value: string,
    domainId: string,
    trafficSourceId: string
  ) => Promise<Pathname | null>;
  createPathname: (pathname: Pathname) => Promise<Pathname>;
  deletePathname: (pathnameId: string) => Promise<void>;
};

export type { PathnameRepository };
