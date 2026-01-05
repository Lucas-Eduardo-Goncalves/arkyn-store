import { CreateWebhookUseCase } from "../../../app/useCases/webhook/createWebhookUseCase";
import { CreateWebhookController } from "../../../infra/controllers/webhook/createWebhookController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/repositories/webhook";

const prismaWebhookRepository = new PrismaWebhookRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const createWebhookUseCase = new CreateWebhookUseCase(
  prismaWebhookRepository,
  prismaTrafficSourceRepository,
  userGateway
);

const createWebhookController = new CreateWebhookController(
  createWebhookUseCase
);

const createWebhook = {
  handle: createWebhookController.handle.bind(createWebhookController),
};

export { createWebhook };
