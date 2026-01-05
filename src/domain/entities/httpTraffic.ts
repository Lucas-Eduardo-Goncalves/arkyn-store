import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";
import { HttpMethod } from "../../main/types/HttpMethod";

type Level = "info" | "fatal" | "warning";

type ConstructorProps = {
  id: string;
  status: number;
  method: HttpMethod;
  level: Level;
  elapsedTime: number;
  trafficUserId: string | null;
  trafficSourceId: string;
  domainId: string;
  pathnameId: string;
  requestId: string;
  responseId: string;
  createdAt: Date;
};

type CreateHttpTrafficProps = {
  status: number;
  method: HttpMethod;
  elapsedTime: number;
  trafficUserId: string | null;
  trafficSourceId: string;
  domainId: string;
  pathnameId: string;
  requestId: string;
  responseId: string;
};

type RestoreHttpTrafficProps = ConstructorProps;

class HttpTraffic {
  id: string;
  status: number;
  method: HttpMethod;
  level: Level;
  elapsedTime: number;
  trafficUserId: string | null;
  trafficSourceId: string;
  domainId: string;
  pathnameId: string;
  requestId: string;
  responseId: string;
  createdAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.status = props.status;
    this.method = props.method;
    this.level = props.level;
    this.elapsedTime = props.elapsedTime;
    this.trafficUserId = props.trafficUserId;
    this.trafficSourceId = props.trafficSourceId;
    this.domainId = props.domainId;
    this.pathnameId = props.pathnameId;
    this.requestId = props.requestId;
    this.responseId = props.responseId;
    this.createdAt = props.createdAt;
  }

  private static getLevelByStatus(status: number): Level {
    if (status >= 400 && status < 500) return "warning";
    else if (status >= 500) return "fatal";
    else return "info";
  }

  static create(props: CreateHttpTrafficProps) {
    return new HttpTraffic({
      id: IdAdapter.generate(),
      status: props.status,
      method: props.method,
      elapsedTime: props.elapsedTime,
      level: this.getLevelByStatus(props.status),
      trafficUserId: props.trafficUserId || null,
      trafficSourceId: props.trafficSourceId,
      domainId: props.domainId,
      pathnameId: props.pathnameId,
      requestId: props.requestId,
      responseId: props.responseId,
      createdAt: new Date(),
    });
  }

  static restore(props: RestoreHttpTrafficProps) {
    return new HttpTraffic({
      id: props.id,
      status: props.status,
      method: props.method,
      level: props.level,
      elapsedTime: props.elapsedTime,
      trafficUserId: props.trafficUserId,
      trafficSourceId: props.trafficSourceId,
      domainId: props.domainId,
      pathnameId: props.pathnameId,
      requestId: props.requestId,
      responseId: props.responseId,
      createdAt: props.createdAt,
    });
  }

  toJson(userUTC: number) {
    return {
      id: this.id,
      status: this.status,
      method: this.method,
      level: this.level,
      elapsedTime: this.elapsedTime,
      trafficUserId: this.trafficUserId,
      trafficSourceId: this.trafficSourceId,
      domainId: this.domainId,
      pathnameId: this.pathnameId,
      requestId: this.requestId,
      responseId: this.responseId,
      createdAt: FormatDateAdapter.format(this.createdAt, userUTC),
    };
  }
}

export { HttpTraffic };
