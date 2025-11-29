import { ListHttpTrafficRecordUseCase } from "../../../app/useCases/httpTrafficRecord/listHttpTrafficRecordUseCase";
import { ListHttpTrafficRecordController } from "../../../infra/controllers/httpTrafficRecord/listHttpTrafficRecordController";
import { PrismaHttpTrafficRecordDAL } from "../../../infra/dal/httpTrafficRecord";

const prismaHttpTrafficRecordDAL = new PrismaHttpTrafficRecordDAL();

const listHttpTrafficRecordUseCase = new ListHttpTrafficRecordUseCase(
  prismaHttpTrafficRecordDAL
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
