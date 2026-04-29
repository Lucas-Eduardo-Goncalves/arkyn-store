import { PrismaSharedTrafficSourceRepository } from "../../../infra/repositories/sharedTrafficSource";
import { ListSharedTrafficSourcesUseCase } from "../../../app/useCases/sharedTrafficSource/listSharedTrafficSourcesUseCase";
import { ListSharedTrafficSourcesController } from "../../../infra/controllers/sharedTrafficSource/listSharedTrafficSourcesController";
import { UserGateway } from "../../../infra/gateways/user";

const prismaSharedTrafficSourceRepository =
  new PrismaSharedTrafficSourceRepository();
const userGateway = new UserGateway();

const listSharedTrafficSourcesUseCase = new ListSharedTrafficSourcesUseCase(
  prismaSharedTrafficSourceRepository,
  userGateway,
);

const listSharedTrafficSourcesController =
  new ListSharedTrafficSourcesController(listSharedTrafficSourcesUseCase);

const listSharedTrafficSources = {
  handle: listSharedTrafficSourcesController.handle.bind(
    listSharedTrafficSourcesController,
  ),
};

export { listSharedTrafficSources };
