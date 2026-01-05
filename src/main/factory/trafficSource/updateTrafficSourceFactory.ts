import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { UpdateTrafficSourceUseCase } from "../../../app/useCases/trafficSource/updateTrafficSourceUseCase";
import { UpdateTrafficSourceController } from "../../../infra/controllers/trafficSource/updateTrafficSourceController";
import { UserGateway } from "../../../infra/gateways/user";

const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const updateTrafficSourceUseCase = new UpdateTrafficSourceUseCase(
  prismaTrafficSourceRepository,
  userGateway
);

const updateTrafficSourceController = new UpdateTrafficSourceController(
  updateTrafficSourceUseCase
);

const updateTrafficSource = {
  handle: updateTrafficSourceController.handle.bind(
    updateTrafficSourceController
  ),
};

export { updateTrafficSource };
