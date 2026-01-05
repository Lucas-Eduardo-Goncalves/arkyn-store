import { CreateRequestUseCase } from "../../../app/useCases/request/createRequestUseCase";
import { CreateRequestController } from "../../../infra/controllers/request/createRequestController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaRequestRepository } from "../../../infra/repositories/request";
import { FileStorageService } from "../../../infra/service/fileStorageService";

const prismaRequestRepository = new PrismaRequestRepository();
const fileStorage = new FileStorageService();
const userGateway = new UserGateway();

const createRequestUseCase = new CreateRequestUseCase(
  prismaRequestRepository,
  fileStorage,
  userGateway
);

const createRequestController = new CreateRequestController(
  createRequestUseCase
);

const createRequest = {
  handle: createRequestController.handle.bind(createRequestController),
};

export { createRequest };
