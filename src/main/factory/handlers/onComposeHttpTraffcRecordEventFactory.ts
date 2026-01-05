import { OnComposeHttpTrafficRecordEvent } from "../../../app/handlers/onComposeHttpTrafficRecordEvent";
import { HttpTrafficNotifier } from "../../../app/services/httpTrafficNotifier";
import { CreateDomainUseCase } from "../../../app/useCases/domain/createDomainUseCase";
import { CreateHttpTrafficUseCase } from "../../../app/useCases/httpTraffic/createHttpTrafficUseCase";
import { CreatePathnameUseCase } from "../../../app/useCases/pathname/createPathnameUseCase";
import { CreateRequestUseCase } from "../../../app/useCases/request/createRequestUseCase";
import { CreateResponseUseCase } from "../../../app/useCases/response/createResponseUseCase";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { PrismaHttpTrafficRepository } from "../../../infra/repositories/httpTraffic";
import { PrismaPathnameRepository } from "../../../infra/repositories/pathname";
import { PrismaRequestRepository } from "../../../infra/repositories/request";
import { PrismaResponseRepository } from "../../../infra/repositories/response";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/repositories/webhook";
import { FileStorageService } from "../../../infra/service/fileStorageService";

const prismaDomainRepository = new PrismaDomainRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaPathnameRepository = new PrismaPathnameRepository();
const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();
const prismaRequestRepository = new PrismaRequestRepository();
const prismaResponseRepository = new PrismaResponseRepository();
const prismaWebhookRepository = new PrismaWebhookRepository();
const fileStorage = new FileStorageService();
const httpTrafficNotifier = new HttpTrafficNotifier(prismaWebhookRepository);
const userGateway = new UserGateway();

const createDomainUseCase = new CreateDomainUseCase(
  prismaDomainRepository,
  prismaTrafficSourceRepository,
  userGateway
);

const createPathnameUseCase = new CreatePathnameUseCase(
  prismaPathnameRepository,
  prismaDomainRepository,
  prismaTrafficSourceRepository,
  userGateway
);

const createHttpTrafficRepository = new CreateHttpTrafficUseCase(
  prismaHttpTrafficRepository,
  prismaTrafficSourceRepository,
  prismaDomainRepository,
  prismaPathnameRepository,
  prismaRequestRepository,
  prismaResponseRepository,
  httpTrafficNotifier,
  userGateway
);

const createRequestUseCase = new CreateRequestUseCase(
  prismaRequestRepository,
  fileStorage,
  userGateway
);

const createResponseUseCase = new CreateResponseUseCase(
  prismaResponseRepository,
  fileStorage,
  userGateway
);

const onComposeHttpTrafficRecord = new OnComposeHttpTrafficRecordEvent(
  createDomainUseCase,
  createPathnameUseCase,
  createHttpTrafficRepository,
  createRequestUseCase,
  createResponseUseCase
);

const onComposeHttpTrafficRecordHandler = {
  handle: onComposeHttpTrafficRecord.handle.bind(onComposeHttpTrafficRecord),
};

export { onComposeHttpTrafficRecordHandler };
