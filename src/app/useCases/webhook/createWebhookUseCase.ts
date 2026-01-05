import { Webhook } from "../../../domain/entities/webhook";
import { UserGatewayDTO } from "../../../domain/gateways/user";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { WebhookRepository } from "../../../domain/repositories/webhook";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  trafficSourceId: string;
  value: string;
  type: "discord";
  level: "fatal" | "warning" | "info";
};

class CreateWebhookUseCase {
  constructor(
    private webhookRepository: WebhookRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const { level, trafficSourceId, type, value } = input;

    const [webhooks, trafficSource, user] = await Promise.all([
      this.webhookRepository.findAll(trafficSourceId),
      this.trafficSourceRepository.findById(trafficSourceId),
      this.userGateway.findUnique(token),
    ]);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== user.id) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    const webhookAlreadyExistsForLevel = webhooks.some(
      (webhook) => webhook.level === level
    );

    if (webhookAlreadyExistsForLevel) {
      throw HttpAdapter.conflict("Webhook for this level already exists");
    }

    const webhook = Webhook.create({ level, type, trafficSourceId, value });
    await this.webhookRepository.createWebhook(webhook);
    return webhook.toJson(user.utc);
  }
}

export { CreateWebhookUseCase };
