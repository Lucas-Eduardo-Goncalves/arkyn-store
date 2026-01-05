import { ListHttpTrafficByIdUseCase } from "../../../app/useCases/httpTraffic/listHttpTrafficByIdUseCase";
import { ListHttpTrafficByIdController } from "../../../infra/controllers/httpTraffic/listHttpTrafficByIdController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaHttpTrafficRepository } from "../../../infra/repositories/httpTraffic";

const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();
const userGateway = new UserGateway();

const listHttpTrafficByIdUseCase = new ListHttpTrafficByIdUseCase(
  prismaHttpTrafficRepository,
  userGateway
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
