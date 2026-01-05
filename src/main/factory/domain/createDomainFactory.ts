import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { CreateDomainUseCase } from "../../../app/useCases/domain/createDomainUseCase";
import { CreateDomainController } from "../../../infra/controllers/domain/createDomainController";
import { UserGateway } from "../../../infra/gateways/user";

const prismaDomainRepository = new PrismaDomainRepository();
const trafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const createDomainUseCase = new CreateDomainUseCase(
  prismaDomainRepository,
  trafficSourceRepository,
  userGateway
);

const createDomainController = new CreateDomainController(createDomainUseCase);

const createDomain = {
  handle: createDomainController.handle.bind(createDomainController),
};

export { createDomain };
