import { HttpTraffic } from "../../../domain/entities/httpTraffic";
import { DomainRepository } from "../../../domain/repositories/domain";
import { HttpTrafficRepository } from "../../../domain/repositories/httpTraffic";
import { PathnameRepository } from "../../../domain/repositories/pathname";
import { RequestRepository } from "../../../domain/repositories/request";
import { ResponseRepository } from "../../../domain/repositories/response";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpMethod } from "../../../main/types/HttpMethod";
import { HttpTrafficNotifier } from "../../services/httpTrafficNotifier";

type InputProps = {
  trafficSourceId: string;
  status: number;
  method: HttpMethod;
  trafficUserId: string | null;
  domainId: string;
  pathnameId: string;
  elapsedTime: number;
  requestId: string;
  responseId: string;
};

class CreateHttpTrafficUseCase {
  constructor(
    private httpTrafficRepository: HttpTrafficRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private domainRepository: DomainRepository,
    private pathnameRepository: PathnameRepository,
    private requestRepository: RequestRepository,
    private responseRepository: ResponseRepository,
    private httpTrafficNotifier: HttpTrafficNotifier
  ) {}

  async execute(input: InputProps, userId: string) {
    const {
      trafficSourceId,
      status,
      method,
      trafficUserId,
      domainId,
      pathnameId,
      elapsedTime,
      requestId,
      responseId,
    } = input;

    const [trafficSource, domain, pathname, request, response] =
      await Promise.all([
        this.trafficSourceRepository.findById(trafficSourceId),
        this.domainRepository.findById(domainId),
        this.pathnameRepository.findById(pathnameId),
        this.requestRepository.findById(requestId),
        this.responseRepository.findById(responseId),
      ]);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    if (!domain) {
      throw HttpAdapter.notFound("Domain not found");
    }

    if (!pathname) {
      throw HttpAdapter.notFound("Pathname not found");
    }

    if (!request) {
      throw HttpAdapter.notFound("Request not found");
    }

    if (!response) {
      throw HttpAdapter.notFound("Response not found");
    }

    const httpTraffic = HttpTraffic.create({
      trafficSourceId,
      domainId,
      method,
      pathnameId,
      status,
      trafficUserId,
      elapsedTime,
      requestId,
      responseId,
    });

    await this.httpTrafficRepository.createHttpTraffic(httpTraffic);
    this.httpTrafficNotifier.send(httpTraffic, domain, trafficSource, pathname);

    return httpTraffic.toJson();
  }
}

export { CreateHttpTrafficUseCase };
