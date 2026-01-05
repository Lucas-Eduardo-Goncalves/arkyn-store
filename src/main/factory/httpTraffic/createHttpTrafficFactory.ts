import { HttpTrafficNotifier } from "../../../app/services/httpTrafficNotifier";
import { CreateHttpTrafficUseCase } from "../../../app/useCases/httpTraffic/createHttpTrafficUseCase";
import { CreateHttpTrafficController } from "../../../infra/controllers/httpTraffic/createHttpTrafficController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { PrismaHttpTrafficRepository } from "../../../infra/repositories/httpTraffic";
import { PrismaPathnameRepository } from "../../../infra/repositories/pathname";
import { PrismaRequestRepository } from "../../../infra/repositories/request";
import { PrismaResponseRepository } from "../../../infra/repositories/response";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/repositories/webhook";

const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaDomainRepository = new PrismaDomainRepository();
const prismaPathnameSourceRepository = new PrismaPathnameRepository();
const prismaRequestRepository = new PrismaRequestRepository();
const prismaResponseRepository = new PrismaResponseRepository();
const prismaWebhookRepository = new PrismaWebhookRepository();
const userGateway = new UserGateway();

const httpTrafficNotifier = new HttpTrafficNotifier(prismaWebhookRepository);

const createHttpTrafficUseCase = new CreateHttpTrafficUseCase(
  prismaHttpTrafficRepository,
  prismaTrafficSourceRepository,
  prismaDomainRepository,
  prismaPathnameSourceRepository,
  prismaRequestRepository,
  prismaResponseRepository,
  httpTrafficNotifier,
  userGateway
);

const createHttpTrafficController = new CreateHttpTrafficController(
  createHttpTrafficUseCase
);

const createHttpTraffic = {
  handle: createHttpTrafficController.handle.bind(createHttpTrafficController),
};

export { createHttpTraffic };
