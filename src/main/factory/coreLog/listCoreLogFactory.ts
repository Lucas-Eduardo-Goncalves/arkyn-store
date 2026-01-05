import { ListCoreLogsUseCase } from "../../../app/useCases/coreLog/listCoreLogsUseCase";
import { ListCoreLogsController } from "../../../infra/controllers/coreLog/listCoreLogsController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaCoreLogRepository } from "../../../infra/repositories/coreLog";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

const prismaCoreLogRepository = new PrismaCoreLogRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const listCoreLogsUseCase = new ListCoreLogsUseCase(
  prismaCoreLogRepository,
  prismaTrafficSourceRepository,
  userGateway
);

const listCoreLogsController = new ListCoreLogsController(listCoreLogsUseCase);

const listCoreLogs = {
  handle: listCoreLogsController.handle.bind(listCoreLogsController),
};

export { listCoreLogs };
