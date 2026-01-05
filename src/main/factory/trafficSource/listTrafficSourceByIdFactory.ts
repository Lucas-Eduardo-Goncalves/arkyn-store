import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { ListTrafficSourceByIdUseCase } from "../../../app/useCases/trafficSource/listTrafficSourceByIdUseCase";
import { ListTrafficSourceByIdController } from "../../../infra/controllers/trafficSource/listTrafficSourceByIdController";
import { UserGateway } from "../../../infra/gateways/user";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const listTrafficSourceByIdUseCase = new ListTrafficSourceByIdUseCase(
  prismaTrafficSourceRepository,
  userGateway
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
