import { SharedTrafficSourceSearchParams } from "../../app/search/sharedTrafficSourceSearchParams";
import { SharedTrafficSource } from "../entities/sharedTrafficSource";

type SharedTrafficSourceRepository = {
  findAll: (
    searchParams: SharedTrafficSourceSearchParams,
  ) => Promise<SharedTrafficSource[]>;
  findById: (
    sharedTrafficSourceId: string,
  ) => Promise<SharedTrafficSource | null>;
  findByTrafficSourceIdWithSharedWithId: (
    trafficSourceId: string,
    sharedWithId: string,
  ) => Promise<SharedTrafficSource | null>;
  createSharedTrafficSource: (
    sharedTrafficSource: SharedTrafficSource,
  ) => Promise<SharedTrafficSource>;
  updateSharedTrafficSource: (
    sharedTrafficSource: SharedTrafficSource,
  ) => Promise<SharedTrafficSource>;
};

export type { SharedTrafficSourceRepository };
