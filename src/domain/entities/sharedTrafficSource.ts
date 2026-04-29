import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";
import { TrafficSource } from "./trafficSource";

type ConstructorProps = {
  id: string;
  userId: string;
  sharedWithId: string;
  trafficSource: TrafficSource;
  permission: "readOnly";
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
};

type CreateSharedTrafficSourceProps = {
  userId: string;
  sharedWithId: string;
  trafficSource: TrafficSource;
};

type RestoreSharedTrafficSourceProps = ConstructorProps;

class SharedTrafficSource {
  id: string;
  userId: string;
  sharedWithId: string;
  trafficSource: TrafficSource;
  permission: "readOnly";
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.sharedWithId = props.sharedWithId;
    this.trafficSource = props.trafficSource;
    this.permission = props.permission;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreateSharedTrafficSourceProps) {
    return new SharedTrafficSource({
      id: IdAdapter.generate(),
      userId: props.userId,
      sharedWithId: props.sharedWithId,
      trafficSource: props.trafficSource,
      permission: "readOnly",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: RestoreSharedTrafficSourceProps) {
    return new SharedTrafficSource({
      id: props.id,
      userId: props.userId,
      sharedWithId: props.sharedWithId,
      trafficSource: props.trafficSource,
      permission: props.permission,
      status: props.status,
      createdAt: new Date(props.createdAt),
      updatedAt: new Date(props.updatedAt),
    });
  }

  acceptInvite() {
    this.status = "accepted";
    this.updatedAt = new Date();
  }

  rejectInvite() {
    this.status = "rejected";
    this.updatedAt = new Date();
  }

  toJson(userUTC: number) {
    return {
      id: this.id,
      userId: this.userId,
      sharedWithId: this.sharedWithId,
      trafficSource: this.trafficSource,
      permission: this.permission,
      status: this.status,
      createdAt: FormatDateAdapter.format(this.createdAt, userUTC),
      updatedAt: FormatDateAdapter.format(this.updatedAt, userUTC),
    };
  }
}

export { SharedTrafficSource };
