import { CreateResponseUseCase } from "../../../app/useCases/response/createResponseUseCase";
import { CreateResponseController } from "../../../infra/controllers/response/createResponseController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaResponseRepository } from "../../../infra/repositories/response";
import { FileStorageService } from "../../../infra/service/fileStorageService";

const prismaResponseRepository = new PrismaResponseRepository();
const fileStorage = new FileStorageService();
const userGateway = new UserGateway();

const createResponseUseCase = new CreateResponseUseCase(
  prismaResponseRepository,
  fileStorage,
  userGateway
);

const createResponseController = new CreateResponseController(
  createResponseUseCase
);

const createResponse = {
  handle: createResponseController.handle.bind(createResponseController),
};

export { createResponse };
