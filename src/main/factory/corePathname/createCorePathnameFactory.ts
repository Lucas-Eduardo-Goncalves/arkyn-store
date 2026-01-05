import { CreateCorePathnameUseCase } from "../../../app/useCases/corePathname/createCorePathnameUseCase";
import { CreateCorePathnameController } from "../../../infra/controllers/corePathname/createCorePathnameController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaCorePathnameRepository } from "../../../infra/repositories/corePathname";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

const prismaCorePathnameRepository = new PrismaCorePathnameRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const createCorePathnameUseCase = new CreateCorePathnameUseCase(
  prismaCorePathnameRepository,
  prismaTrafficSourceRepository,
  userGateway
);

const createCorePathnameController = new CreateCorePathnameController(
  createCorePathnameUseCase
);

const createCorePathname = {
  handle: createCorePathnameController.handle.bind(
    createCorePathnameController
  ),
};

export { createCorePathname };
