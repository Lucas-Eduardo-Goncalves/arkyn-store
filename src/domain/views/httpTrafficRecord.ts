import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { Domain } from "../entities/domain";
import { HttpTraffic } from "../entities/httpTraffic";
import { Pathname } from "../entities/pathname";
import { Request } from "../entities/request";
import { Response } from "../entities/response";

type ConstructorProps = {
  _httpTraffic: HttpTraffic;
  _request: Request | null;
  _response: Response | null;
  _domain: Domain;
  _pathname: Pathname;
};

type RestoreHttpTrafficRecordProps = {
  _httpTraffic: HttpTraffic;
  _request: Request | null;
  _response: Response | null;
  _domain: Domain;
  _pathname: Pathname;
};

class HttpTrafficRecord {
  _httpTraffic: HttpTraffic;
  _request: Request | null;
  _response: Response | null;
  _domain: Domain;
  _pathname: Pathname;

  private constructor(props: ConstructorProps) {
    this._httpTraffic = props._httpTraffic;
    this._request = props._request;
    this._response = props._response;
    this._domain = props._domain;
    this._pathname = props._pathname;
  }

  static restore(props: RestoreHttpTrafficRecordProps) {
    return new HttpTrafficRecord({
      _httpTraffic: props._httpTraffic,
      _request: props._request,
      _response: props._response,
      _domain: props._domain,
      _pathname: props._pathname,
    });
  }

  makeRequest(userUTC: number) {
    if (!this._request) return null;
    return {
      headers: this._request.headers,
      bodyPreview: this._request.bodyPreview,
      bodyUrl: this._request.bodyUrl,
      queryParams: this._request.queryParams,
      createdAt: FormatDateAdapter.format(this._request.createdAt, userUTC),
    };
  }

  makeResponse(userUTC: number) {
    if (!this._response) return null;
    return {
      headers: this._response.headers,
      bodyPreview: this._response.bodyPreview,
      bodyUrl: this._response.bodyUrl,
      createdAt: FormatDateAdapter.format(this._response.createdAt, userUTC),
    };
  }

  toJson(userUTC: number) {
    return {
      id: this._httpTraffic.id,
      status: this._httpTraffic.status,
      method: this._httpTraffic.method,
      protocol: this._domain.protocol,
      level: this._httpTraffic.level,
      elapsedTime: this._httpTraffic.elapsedTime,
      trafficUserId: this._httpTraffic.trafficUserId,
      trafficSourceId: this._httpTraffic.trafficSourceId,
      domain: this._domain.value,
      pathname: this._pathname.value,
      request: this.makeRequest(userUTC),
      response: this.makeResponse(userUTC),
      createdAt: FormatDateAdapter.format(this._httpTraffic.createdAt, userUTC),
    };
  }
}

export { HttpTrafficRecord };
