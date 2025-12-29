import { Domain } from "../../domain/entities/domain";
import { HttpTraffic } from "../../domain/entities/httpTraffic";
import { Pathname } from "../../domain/entities/pathname";
import { TrafficSource } from "../../domain/entities/trafficSource";
import { WebhookRepository } from "../../domain/repositories/webhook";
import { WebhookService } from "../../infra/service/webhookService";
import { environmentVariables } from "../../main/config/environmentVariables";
import { convertMsToTime } from "./convertMsToTime";

class HttpTrafficNotifier {
  constructor(private webhookRepository: WebhookRepository) {}

  async send(
    httpTraffic: HttpTraffic,
    domain: Domain,
    trafficSource: TrafficSource,
    pathname: Pathname
  ) {
    const { level, trafficSourceId, method } = httpTraffic;

    const webhook = await this.webhookRepository.findUnique(
      trafficSourceId,
      level
    );

    if (!webhook) return;

    const webhookService = new WebhookService(webhook);

    const url = `URL: ${domain.value}${pathname.value}`;
    const elapsedTime = `Elapsed Time: ${convertMsToTime(
      httpTraffic.elapsedTime
    )}`;
    const panelUrl = `Panel URL: ${environmentVariables.MICRO_PANEL_URL}/traffic-sources/${trafficSource.id}/http-traffics?httpTrafficId=${httpTraffic.id}`;

    await webhookService.send({
      title: `HttpTraffic - ${method} - ${httpTraffic.status}`,
      description: `${url}\n${elapsedTime}\n${panelUrl}`,
    });
  }
}

export { HttpTrafficNotifier };
