import { CreateSharedTrafficSourceUseCase } from "../../../app/useCases/sharedTrafficSource/createSharedTrafficSourceUseCase";
import { CreateSharedTrafficSourceController } from "../../../infra/controllers/sharedTrafficSource/createSharedTrafficSourceController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaSharedTrafficSourceRepository } from "../../../infra/repositories/sharedTrafficSource";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaSharedTrafficSourceRepository = new PrismaSharedTrafficSourceRepository();
const userGateway = new UserGateway();

const createSharedTrafficSourceUseCase = new CreateSharedTrafficSourceUseCase(
  prismaTrafficSourceRepository,
  prismaSharedTrafficSourceRepository,
  userGateway,
);

const createSharedTrafficSourceController = new CreateSharedTrafficSourceController(createSharedTrafficSourceUseCase);

const createSharedTrafficSource = {
  handle: createSharedTrafficSourceController.handle.bind(createSharedTrafficSourceController),
};

export { createSharedTrafficSource };
