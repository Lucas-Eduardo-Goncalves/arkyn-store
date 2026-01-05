import { UpdateWebhookUseCase } from "../../../app/useCases/webhook/updateWebhookUseCase";
import { UpdateWebhookController } from "../../../infra/controllers/webhook/updateWebhookController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/repositories/webhook";

const prismaWebhookRepository = new PrismaWebhookRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const updateWebhookUseCase = new UpdateWebhookUseCase(
  prismaWebhookRepository,
  prismaTrafficSourceRepository,
  userGateway
);

const updateWebhookController = new UpdateWebhookController(
  updateWebhookUseCase
);

const updateWebhook = {
  handle: updateWebhookController.handle.bind(updateWebhookController),
};

export { updateWebhook };
