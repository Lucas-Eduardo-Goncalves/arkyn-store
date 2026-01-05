import { PrismaPathnameRepository } from "../../../infra/repositories/pathname";
import { ListPathnamesUseCase } from "../../../app/useCases/pathname/listPathnamesUseCase";
import { ListPathnamesController } from "../../../infra/controllers/pathname/listPathnamesController";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { UserGateway } from "../../../infra/gateways/user";

const prismaPathnameRepository = new PrismaPathnameRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaDomainRepository = new PrismaDomainRepository();
const userGateway = new UserGateway();

const listPathnamesUseCase = new ListPathnamesUseCase(
  prismaPathnameRepository,
  prismaTrafficSourceRepository,
  prismaDomainRepository,
  userGateway
);

const listPathnamesController = new ListPathnamesController(
  listPathnamesUseCase
);

const listPathnames = {
  handle: listPathnamesController.handle.bind(listPathnamesController),
};

export { listPathnames };
