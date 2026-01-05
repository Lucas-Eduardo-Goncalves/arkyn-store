import { ListHttpTrafficRecordUseCase } from "../../../app/useCases/httpTrafficRecord/listHttpTrafficRecordUseCase";
import { ListHttpTrafficRecordController } from "../../../infra/controllers/httpTrafficRecord/listHttpTrafficRecordController";
import { PrismaHttpTrafficRecordDAL } from "../../../infra/dal/httpTrafficRecord";
import { UserGateway } from "../../../infra/gateways/user";

const prismaHttpTrafficRecordDAL = new PrismaHttpTrafficRecordDAL();
const userGateway = new UserGateway();

const listHttpTrafficRecordUseCase = new ListHttpTrafficRecordUseCase(
  prismaHttpTrafficRecordDAL,
  userGateway
);

const listHttpTrafficRecordController = new ListHttpTrafficRecordController(
  listHttpTrafficRecordUseCase
);

const listHttpTrafficRecord = {
  handle: listHttpTrafficRecordController.handle.bind(
    listHttpTrafficRecordController
  ),
};

export { listHttpTrafficRecord };
