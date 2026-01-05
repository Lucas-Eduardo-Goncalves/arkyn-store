import { ComposeHttpTrafficRecordEvent } from "../../domain/events/composeHttpTrafficRecordEvent";
import { CreateDomainUseCase } from "../useCases/domain/createDomainUseCase";
import { CreateHttpTrafficUseCase } from "../useCases/httpTraffic/createHttpTrafficUseCase";
import { CreatePathnameUseCase } from "../useCases/pathname/createPathnameUseCase";
import { CreateRequestUseCase } from "../useCases/request/createRequestUseCase";
import { CreateResponseUseCase } from "../useCases/response/createResponseUseCase";

class OnComposeHttpTrafficRecordEvent {
  constructor(
    private createDomainUseCase: CreateDomainUseCase,
    private createPathnameUseCase: CreatePathnameUseCase,
    private createHttpTrafficUseCase: CreateHttpTrafficUseCase,
    private createRequestUseCase: CreateRequestUseCase,
    private createResponseUseCase: CreateResponseUseCase
  ) {}

  async handle(input: ComposeHttpTrafficRecordEvent) {
    const {
      domainUrl,
      pathnameUrl,
      trafficSourceId,
      status,
      protocol,
      method,
      trafficUserId,
      requestHeaders,
      requestBody,
      queryParams,
      responseHeaders,
      responseBody,
      elapsedTime,
      token,
    } = input;

    const domain = await this.createDomainUseCase.execute(
      { trafficSourceId, value: domainUrl, protocol },
      token
    );

    const pathname = await this.createPathnameUseCase.execute(
      { trafficSourceId, domainId: domain.id, value: pathnameUrl },
      token
    );

    const [request, response] = await Promise.all([
      this.createRequestUseCase.execute(
        { body: requestBody, headers: requestHeaders, queryParams },
        token
      ),
      this.createResponseUseCase.execute(
        { body: responseBody, headers: responseHeaders },
        token
      ),
    ]);

    await this.createHttpTrafficUseCase.execute(
      {
        trafficSourceId,
        domainId: domain.id,
        pathnameId: pathname.id,
        status,
        method,
        trafficUserId,
        elapsedTime,
        requestId: request.id,
        responseId: response.id,
      },
      token
    );
  }
}

export { OnComposeHttpTrafficRecordEvent };
