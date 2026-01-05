import { ListWebhooksUseCase } from "../../../app/useCases/webhook/listWebhooksUseCase";
import { ListWebhooksController } from "../../../infra/controllers/webhook/listWebhooksController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/repositories/webhook";

const prismaWebhookRepository = new PrismaWebhookRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const listWebhooksUseCase = new ListWebhooksUseCase(
  prismaWebhookRepository,
  prismaTrafficSourceRepository,
  userGateway
);

const listWebhooksController = new ListWebhooksController(listWebhooksUseCase);

const listWebhooks = {
  handle: listWebhooksController.handle.bind(listWebhooksController),
};

export { listWebhooks };
