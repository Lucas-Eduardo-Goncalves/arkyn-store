import { SharedTrafficSource } from "../../../domain/entities/sharedTrafficSource";
import { UserGatewayDTO } from "../../../domain/gateways/user";
import { SharedTrafficSourceRepository } from "../../../domain/repositories/sharedTrafficSource";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  userEmail: string;
  trafficSourceId: string;
};

class CreateSharedTrafficSourceUseCase {
  constructor(
    private trafficSourceRepository: TrafficSourceRepository,
    private sharedTrafficSourceRepository: SharedTrafficSourceRepository,
    private userGateway: UserGatewayDTO,
  ) {}

  async execute(input: InputProps, token: string) {
    const { userEmail, trafficSourceId } = input;

    const [trafficSource, user, sharedUser] = await Promise.all([
      this.trafficSourceRepository.findById(trafficSourceId),
      this.userGateway.findUnique(token),
      this.userGateway.findByEmail(userEmail),
    ]);

    if (userEmail === user.email) {
      const message = "You cannot share a traffic source with yourself";
      throw HttpAdapter.badRequest(message);
    }

    if (!trafficSource) {
      const message = "Traffic source not found";
      throw HttpAdapter.notFound(message);
    }

    if (trafficSource.userId !== user.id) {
      const message = "You don't have permission to share this traffic source";
      throw HttpAdapter.forbidden(message);
    }

    if (!user || !sharedUser) {
      const message = "User not found";
      throw HttpAdapter.notFound(message);
    }

    const alreadyShared =
      await this.sharedTrafficSourceRepository.findByTrafficSourceIdWithSharedWithId(
        trafficSourceId,
        sharedUser.id,
      );

    if (alreadyShared) {
      const message = `This traffic source has a ${alreadyShared.status} invite for this user`;
      throw HttpAdapter.badRequest(message);
    }

    const sharedTrafficSource = SharedTrafficSource.create({
      userId: user.id,
      sharedWithId: sharedUser.id,
      trafficSource,
    });

    await this.sharedTrafficSourceRepository.createSharedTrafficSource(
      sharedTrafficSource,
    );

    return sharedTrafficSource.toJson(user.utc);
  }
}

export { CreateSharedTrafficSourceUseCase };
