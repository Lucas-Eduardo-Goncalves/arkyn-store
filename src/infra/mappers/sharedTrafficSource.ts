import { SharedTrafficSource } from "../../domain/entities/sharedTrafficSource";
import { TrafficSource } from "../../domain/entities/trafficSource";

type SharedTrafficSourceMapperDTO = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  trafficSourceId: string;
  status: "pending" | "accepted" | "rejected";
  sharedWithId: string;
  permission: "readOnly";
  trafficSource: {
    id: string;
    createdAt: Date;
    name: string;
    trafficDomain: string;
    userId: string;
    updatedAt: Date;
  };
};

class SharedTrafficSourceMapper {
  static toEntity(
    sharedTrafficSource: SharedTrafficSourceMapperDTO,
  ): SharedTrafficSource {
    return SharedTrafficSource.restore({
      id: sharedTrafficSource.id,
      userId: sharedTrafficSource.userId,
      sharedWithId: sharedTrafficSource.sharedWithId,
      status: sharedTrafficSource.status,
      permission: sharedTrafficSource.permission,
      createdAt: sharedTrafficSource.createdAt,
      updatedAt: sharedTrafficSource.updatedAt,
      trafficSource: TrafficSource.restore({
        id: sharedTrafficSource.trafficSource.id,
        createdAt: sharedTrafficSource.trafficSource.createdAt,
        name: sharedTrafficSource.trafficSource.name,
        trafficDomain: sharedTrafficSource.trafficSource.trafficDomain,
        userId: sharedTrafficSource.trafficSource.userId,
        updatedAt: sharedTrafficSource.trafficSource.updatedAt,
      }),
    });
  }
}
export { SharedTrafficSourceMapper };
