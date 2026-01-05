import { ListHttpTrafficRecordsUseCase } from "../../../app/useCases/httpTrafficRecord/listHttpTrafficRecordsUseCase";
import { ListHttpTrafficRecordsController } from "../../../infra/controllers/httpTrafficRecord/listHttpTrafficRecordsController";
import { PrismaHttpTrafficRecordDAL } from "../../../infra/dal/httpTrafficRecord";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

const prismaHttpTrafficRecordDAL = new PrismaHttpTrafficRecordDAL();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const listHttpTrafficRecordsUseCase = new ListHttpTrafficRecordsUseCase(
  prismaHttpTrafficRecordDAL,
  prismaTrafficSourceRepository,
  userGateway
);

const listHttpTrafficRecordsController = new ListHttpTrafficRecordsController(
  listHttpTrafficRecordsUseCase
);

const listHttpTrafficRecords = {
  handle: listHttpTrafficRecordsController.handle.bind(
    listHttpTrafficRecordsController
  ),
};

export { listHttpTrafficRecords };
