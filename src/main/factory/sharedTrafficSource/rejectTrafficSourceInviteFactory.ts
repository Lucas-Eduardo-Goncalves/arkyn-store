import { PrismaSharedTrafficSourceRepository } from "../../../infra/repositories/sharedTrafficSource";
import { RejectSharedTrafficSourceInviteUseCase } from "../../../app/useCases/sharedTrafficSource/rejectSharedTrafficSourceInviteUseCase";
import { RejectSharedTrafficSourceInviteController } from "../../../infra/controllers/sharedTrafficSource/rejectTrafficSourceInviteController";
import { UserGateway } from "../../../infra/gateways/user";

const prismaSharedTrafficSourceRepository =
  new PrismaSharedTrafficSourceRepository();
const userGateway = new UserGateway();

const rejectSharedTrafficSourceInviteUseCase =
  new RejectSharedTrafficSourceInviteUseCase(
    prismaSharedTrafficSourceRepository,
    userGateway,
  );

const rejectSharedTrafficSourceInviteController =
  new RejectSharedTrafficSourceInviteController(
    rejectSharedTrafficSourceInviteUseCase,
  );

const rejectSharedTrafficSourceInvite = {
  handle: rejectSharedTrafficSourceInviteController.handle.bind(
    rejectSharedTrafficSourceInviteController,
  ),
};

export { rejectSharedTrafficSourceInvite };
