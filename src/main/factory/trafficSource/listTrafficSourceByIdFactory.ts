import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { ListTrafficSourceByIdUseCase } from "../../../app/useCases/trafficSource/listTrafficSourceByIdUseCase";
import { ListTrafficSourceByIdController } from "../../../infra/controllers/trafficSource/listTrafficSourceByIdController";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const listTrafficSourceByIdUseCase = new ListTrafficSourceByIdUseCase(
  prismaTrafficSourceRepository
);

const listTrafficSourceByIdController = new ListTrafficSourceByIdController(
  listTrafficSourceByIdUseCase
);

const listTrafficSourceById = {
  handle: listTrafficSourceByIdController.handle.bind(
    listTrafficSourceByIdController
  ),
};

export { listTrafficSourceById };
