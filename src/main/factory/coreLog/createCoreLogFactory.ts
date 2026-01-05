import { CreateCoreLogUseCase } from "../../../app/useCases/coreLog/createCoreLogUseCase";
import { CreateCoreLogController } from "../../../infra/controllers/coreLog/createCoreLogController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaCoreLogRepository } from "../../../infra/repositories/coreLog";
import { PrismaCorePathnameRepository } from "../../../infra/repositories/corePathname";
import { PrismaRequestRepository } from "../../../infra/repositories/request";
import { PrismaResponseRepository } from "../../../infra/repositories/response";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

const prismaCoreLogRepository = new PrismaCoreLogRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaCorePathnameSourceRepository = new PrismaCorePathnameRepository();
const prismaRequestRepository = new PrismaRequestRepository();
const prismaResponseRepository = new PrismaResponseRepository();
const userGateway = new UserGateway();

const createCoreLogUseCase = new CreateCoreLogUseCase(
  prismaCoreLogRepository,
  prismaTrafficSourceRepository,
  prismaCorePathnameSourceRepository,
  prismaRequestRepository,
  prismaResponseRepository,
  userGateway
);

const createCoreLogController = new CreateCoreLogController(
  createCoreLogUseCase
);

const createCoreLog = {
  handle: createCoreLogController.handle.bind(createCoreLogController),
};

export { createCoreLog };
