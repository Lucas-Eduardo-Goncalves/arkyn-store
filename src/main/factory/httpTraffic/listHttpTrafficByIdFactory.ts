import { ListHttpTrafficByIdUseCase } from "../../../app/useCases/httpTraffic/listHttpTrafficByIdUseCase";
import { ListHttpTrafficByIdController } from "../../../infra/controllers/httpTraffic/listHttpTrafficByIdController";
import { PrismaHttpTrafficRepository } from "../../../infra/repositories/httpTraffic";

const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();

const listHttpTrafficByIdUseCase = new ListHttpTrafficByIdUseCase(
  prismaHttpTrafficRepository
);

const listHttpTrafficByIdController = new ListHttpTrafficByIdController(
  listHttpTrafficByIdUseCase
);

const listHttpTrafficById = {
  handle: listHttpTrafficByIdController.handle.bind(
    listHttpTrafficByIdController
  ),
};

export { listHttpTrafficById };
