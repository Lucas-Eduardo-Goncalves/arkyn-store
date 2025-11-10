import { CreateTrafficSourceUseCase } from "../../../app/useCases/trafficSource/createTrafficSourceUseCase";
import { CreateTrafficSourceController } from "../../../infra/controllers/trafficSource/createTrafficSourceController";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const createTrafficSourceUseCase = new CreateTrafficSourceUseCase(
  prismaTrafficSourceRepository
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
