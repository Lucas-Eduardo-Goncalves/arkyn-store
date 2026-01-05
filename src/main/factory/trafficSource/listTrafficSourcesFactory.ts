import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { ListTrafficSourcesUseCase } from "../../../app/useCases/trafficSource/listTrafficSourcesUseCase";
import { ListTrafficSourcesController } from "../../../infra/controllers/trafficSource/listTrafficSourcesController";
import { UserGateway } from "../../../infra/gateways/user";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const listTrafficSourcesUseCase = new ListTrafficSourcesUseCase(
  prismaTrafficSourceRepository,
  userGateway
);

const listTrafficSourcesController = new ListTrafficSourcesController(
  listTrafficSourcesUseCase
);

const listTrafficSources = {
  handle: listTrafficSourcesController.handle.bind(
    listTrafficSourcesController
  ),
};

export { listTrafficSources };
