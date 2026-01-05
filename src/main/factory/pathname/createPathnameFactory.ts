import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { PrismaPathnameRepository } from "../../../infra/repositories/pathname";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { CreatePathnameUseCase } from "../../../app/useCases/pathname/createPathnameUseCase";
import { CreatePathnameController } from "../../../infra/controllers/pathname/createPathnameController";
import { UserGateway } from "../../../infra/gateways/user";

const prismaPathnameRepository = new PrismaPathnameRepository();
const prismaDomainRepository = new PrismaDomainRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const createPathnameUseCase = new CreatePathnameUseCase(
  prismaPathnameRepository,
  prismaDomainRepository,
  prismaTrafficSourceRepository,
  userGateway
);

const createPathnameController = new CreatePathnameController(
  createPathnameUseCase
);

const createPathname = {
  handle: createPathnameController.handle.bind(createPathnameController),
};

export { createPathname };
