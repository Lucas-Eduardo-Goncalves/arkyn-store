import { UserGatewayDTO } from "../../../domain/gateways/user";
import { SharedTrafficSourceRepository } from "../../../domain/repositories/sharedTrafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class RejectSharedTrafficSourceInviteUseCase {
  constructor(
    private sharedTrafficSourceRepository: SharedTrafficSourceRepository,
    private userGateway: UserGatewayDTO,
  ) {}

  async execute(sharedTrafficSourceId: string, token: string) {
    const [sharedTrafficSource, user] = await Promise.all([
      this.sharedTrafficSourceRepository.findById(sharedTrafficSourceId),
      this.userGateway.findUnique(token),
    ]);

    if (!sharedTrafficSource) {
      throw HttpAdapter.notFound("Traffic source share not found");
    }

    if (!user) {
      throw HttpAdapter.unauthorized("User not are authorized");
    }

    if (sharedTrafficSource.sharedWithId !== user.id) {
      throw HttpAdapter.unauthorized("User not are authorized");
    }

    if (sharedTrafficSource.status !== "pending") {
      const message = `Invite already ${sharedTrafficSource.status}ed`;
      throw HttpAdapter.badRequest(message);
    }

    sharedTrafficSource.rejectInvite();

    await this.sharedTrafficSourceRepository.updateSharedTrafficSource(
      sharedTrafficSource,
    );

    return sharedTrafficSource.toJson(user.utc);
  }
}

export { RejectSharedTrafficSourceInviteUseCase };
