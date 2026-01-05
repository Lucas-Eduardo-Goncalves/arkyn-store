import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";
import { HttpMethod } from "../../main/types/HttpMethod";
import { Entity } from "../protocol/entity";

type Level = "info" | "fatal" | "warning";

type ConstructorProps = {
  id: string;
  status: number;
  method: HttpMethod;
  level: Level;
  elapsedTime: number;
  trafficUserId: string | null;
  trafficSourceId: string;
  corePathnameId: string;
  requestId: string;
  responseId: string;
  createdAt: Date;
};

type CreateCoreLogProps = {
  status: number;
  method: HttpMethod;
  elapsedTime: number;
  trafficUserId: string | null;
  trafficSourceId: string;
  corePathnameId: string;
  requestId: string;
  responseId: string;
};

type RestoreCoreLogProps = ConstructorProps;

class CoreLog implements Entity {
  id: string;
  status: number;
  method: HttpMethod;
  level: Level;
  elapsedTime: number;
  trafficUserId: string | null;
  trafficSourceId: string;
  corePathnameId: string;
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
    this.corePathnameId = props.corePathnameId;
    this.requestId = props.requestId;
    this.responseId = props.responseId;
    this.createdAt = props.createdAt;
  }

  private static getLevelByStatus(status: number): Level {
    if (status >= 400 && status < 500) return "warning";
    else if (status >= 500) return "fatal";
    else return "info";
  }

  static create(props: CreateCoreLogProps) {
    return new CoreLog({
      id: IdAdapter.generate(),
      status: props.status,
      method: props.method,
      level: this.getLevelByStatus(props.status),
      elapsedTime: props.elapsedTime,
      trafficUserId: props.trafficUserId,
      trafficSourceId: props.trafficSourceId,
      corePathnameId: props.corePathnameId || "",
      requestId: props.requestId || "",
      responseId: props.responseId || "",
      createdAt: new Date(),
    });
  }

  static restore(props: RestoreCoreLogProps) {
    return new CoreLog({
      id: props.id,
      status: props.status,
      method: props.method,
      level: props.level,
      elapsedTime: props.elapsedTime,
      trafficUserId: props.trafficUserId,
      trafficSourceId: props.trafficSourceId,
      corePathnameId: props.corePathnameId,
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
      trafficUserId: this.trafficUserId,
      trafficSourceId: this.trafficSourceId,
      corePathnameId: this.corePathnameId,
      requestId: this.requestId,
      responseId: this.responseId,
      createdAt: FormatDateAdapter.format(this.createdAt, userUTC),
    };
  }
}

export { CoreLog };
