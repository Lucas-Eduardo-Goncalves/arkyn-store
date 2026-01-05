import { ListCorePathnamesUseCase } from "../../../app/useCases/corePathname/listCorePathnamesUseCase";
import { ListCorePathnamesController } from "../../../infra/controllers/corePathname/listCorePathnamesController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaCorePathnameRepository } from "../../../infra/repositories/corePathname";

const prismaCorePathnameRepository = new PrismaCorePathnameRepository();
const userGateway = new UserGateway();

const listCorePathnamesUseCase = new ListCorePathnamesUseCase(
  prismaCorePathnameRepository,
  userGateway
);

const listCorePathnamesController = new ListCorePathnamesController(
  listCorePathnamesUseCase
);

const listCorePathnames = {
  handle: listCorePathnamesController.handle.bind(listCorePathnamesController),
};

export { listCorePathnames };
