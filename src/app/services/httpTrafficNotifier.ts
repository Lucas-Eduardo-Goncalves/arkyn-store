import { Domain } from "../../domain/entities/domain";
import { HttpTraffic } from "../../domain/entities/httpTraffic";
import { Pathname } from "../../domain/entities/pathname";
import { WebhookRepository } from "../../domain/repositories/webhook";
import { WebhookService } from "../../infra/service/webhookService";
import { environmentVariables } from "../../main/config/environmentVariables";

class HttpTrafficNotifier {
  constructor(private webhookRepository: WebhookRepository) {}

  async send(httpTraffic: HttpTraffic, domain: Domain, pathname: Pathname) {
    const { level, trafficSourceId, method } = httpTraffic;

    const webhook = await this.webhookRepository.findUnique(
      trafficSourceId,
      level
    );

    if (!webhook) return;

    const webhookService = new WebhookService(webhook);

    await webhookService.send({
      title: `HttpTraffic - ${method} - ${httpTraffic.status}`,
      description: `URL: ${domain.value}${pathname.value}\nElapsed Time: ${httpTraffic.elapsedTime}ms\nPanel URL: ${environmentVariables.MICRO_PANEL_URL}/traffic/${httpTraffic.id}`,
    });
  }
}

export { HttpTrafficNotifier };
