import { HttpMethod } from "../../main/types/HttpMethod";

class ComposeHttpTrafficRecordEvent {
  readonly domainUrl: string;
  readonly pathnameUrl: string;
  readonly trafficSourceId: string;
  readonly status: number;
  readonly protocol: "http" | "https";
  readonly method: HttpMethod;
  readonly trafficUserId: string | null;
  readonly elapsedTime: number;
  readonly requestHeaders: string;
  readonly requestBody: string | null;
  readonly queryParams: string;
  readonly responseHeaders: string;
  readonly responseBody: string | null;
  readonly token: string;

  constructor(data: ComposeHttpTrafficRecordEvent) {
    this.domainUrl = data.domainUrl;
    this.pathnameUrl = data.pathnameUrl;
    this.trafficSourceId = data.trafficSourceId;
    this.status = data.status;
    this.protocol = data.protocol;
    this.method = data.method;
    this.elapsedTime = data.elapsedTime;
    this.trafficUserId = data.trafficUserId;
    this.requestHeaders = data.requestHeaders;
    this.requestBody = data.requestBody;
    this.queryParams = data.queryParams;
    this.responseHeaders = data.responseHeaders;
    this.responseBody = data.responseBody;
    this.token = data.token;
  }
}

export { ComposeHttpTrafficRecordEvent };
