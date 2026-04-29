import { AcceptSharedTrafficSourceInviteUseCase } from "../../../app/useCases/sharedTrafficSource/acceptSharedTrafficSourceInviteUseCase";
import { AcceptSharedTrafficSourceInviteController } from "../../../infra/controllers/sharedTrafficSource/acceptTrafficSourceInviteController";
import { UserGateway } from "../../../infra/gateways/user";
import { PrismaSharedTrafficSourceRepository } from "../../../infra/repositories/sharedTrafficSource";

const prismaSharedTrafficSourceRepository =
  new PrismaSharedTrafficSourceRepository();
const userGateway = new UserGateway();

const acceptSharedTrafficSourceInviteUseCase =
  new AcceptSharedTrafficSourceInviteUseCase(
    prismaSharedTrafficSourceRepository,
    userGateway,
  );

const acceptSharedTrafficSourceInviteController =
  new AcceptSharedTrafficSourceInviteController(
    acceptSharedTrafficSourceInviteUseCase,
  );

const acceptSharedTrafficSourceInvite = {
  handle: acceptSharedTrafficSourceInviteController.handle.bind(
    acceptSharedTrafficSourceInviteController,
  ),
};

export { acceptSharedTrafficSourceInvite };
