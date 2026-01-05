import { CreateTrafficSourceUseCase } from "../../../app/useCases/trafficSource/createTrafficSourceUseCase";
import { CreateTrafficSourceController } from "../../../infra/controllers/trafficSource/createTrafficSourceController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const createTrafficSourceUseCase = new CreateTrafficSourceUseCase(
  prismaTrafficSourceRepository,
  userGateway
);

const createTrafficSourceController = new CreateTrafficSourceController(
  createTrafficSourceUseCase
);

const createTrafficSource = {
  handle: createTrafficSourceController.handle.bind(
    createTrafficSourceController
  ),
};

export { createTrafficSource };
