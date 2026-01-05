import { UserGatewayDTO } from "../../../domain/gateways/user";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { WebhookRepository } from "../../../domain/repositories/webhook";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  trafficSourceId: string;
};

class ListWebhooksUseCase {
  constructor(
    private webhookRepository: WebhookRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const { trafficSourceId } = input;

    const [trafficSource, webhooks, user] = await Promise.all([
      this.trafficSourceRepository.findById(trafficSourceId),
      this.webhookRepository.findAll(trafficSourceId),
      this.userGateway.findUnique(token),
    ]);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== user.id) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    return webhooks.map((w) => w.toJson(user.utc));
  }
}

export { ListWebhooksUseCase };
