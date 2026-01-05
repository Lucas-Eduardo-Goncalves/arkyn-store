import { ComposeHttpTrafficRecordEvent } from "../../../domain/events/composeHttpTrafficRecordEvent";
import { HttpMethod } from "../../../main/types/HttpMethod";
import { eventMediator } from "../../shared/eventMediator";

type InputProps = {
  domainUrl: string;
  pathnameUrl: string;
  trafficSourceId: string;
  status: number;
  protocol: "http" | "https";
  method: HttpMethod;
  trafficUserId: string | null;
  requestHeaders: string;
  requestBody: string | null;
  queryParams: string;
  responseHeaders: string;
  responseBody: string | null;
  elapsedTime: number;
};

class ComposeHttpTrafficRecordUseCase {
  constructor() {}

  async execute(input: InputProps, token: string) {
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
    } = input;

    await eventMediator.publish(
      "composeHttpTrafficRecordEvent",
      new ComposeHttpTrafficRecordEvent({
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
      })
    );

    return;
  }
}

export { ComposeHttpTrafficRecordUseCase };
