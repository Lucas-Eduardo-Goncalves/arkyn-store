import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { ListTrafficSourcesUseCase } from "../../../app/useCases/trafficSource/listTrafficSourcesUseCase";
import { ListTrafficSourcesController } from "../../../infra/controllers/trafficSource/listTrafficSourcesController";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const listTrafficSourcesUseCase = new ListTrafficSourcesUseCase(
  prismaTrafficSourceRepository
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
