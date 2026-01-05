import { UserGatewayDTO } from "../../../domain/gateways/user";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { WebhookRepository } from "../../../domain/repositories/webhook";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  webhookId: string;
  value: string;
  level: "fatal" | "warning" | "info";
};

class UpdateWebhookUseCase {
  constructor(
    private webhookRepository: WebhookRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const { webhookId, value, level } = input;

    const [webhook, user] = await Promise.all([
      this.webhookRepository.findById(webhookId),
      this.userGateway.findUnique(token),
    ]);

    if (!webhook) {
      throw HttpAdapter.notFound("Webhook not found");
    }

    const trafficSource = await this.trafficSourceRepository.findById(
      webhook.trafficSourceId
    );

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== user.id) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    webhook.updateWebhook({ value, level });

    await this.webhookRepository.updateWebhook(webhook);
    return webhook.toJson(user.utc);
  }
}

export { UpdateWebhookUseCase };
