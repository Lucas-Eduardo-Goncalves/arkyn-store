import { ListDomainsUseCase } from "../../../app/useCases/domain/listDomainsUseCase";
import { ListDomainsController } from "../../../infra/controllers/domain/listDomainsController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

const prismaDomainRepository = new PrismaDomainRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const userGateway = new UserGateway();

const listDomainsUseCase = new ListDomainsUseCase(
  prismaDomainRepository,
  prismaTrafficSourceRepository,
  userGateway
);

const listDomainsController = new ListDomainsController(listDomainsUseCase);

const listDomains = {
  handle: listDomainsController.handle.bind(listDomainsController),
};

export { listDomains };
