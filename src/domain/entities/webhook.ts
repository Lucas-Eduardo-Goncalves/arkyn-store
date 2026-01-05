import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  level: "fatal" | "warning" | "info";
  type: "discord";
  value: string;
  trafficSourceId: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateWebhookProps = {
  value: string;
  level: "fatal" | "warning" | "info";
  type: "discord";
  trafficSourceId: string;
};

type UpdateWebhookProps = {
  value: string;
  level: "fatal" | "warning" | "info";
};

type RestoreWebhookProps = ConstructorProps;

class Webhook {
  id: string;
  level: "fatal" | "warning" | "info";
  type: "discord";
  value: string;
  trafficSourceId: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.level = props.level;
    this.value = props.value;
    this.type = props.type;
    this.trafficSourceId = props.trafficSourceId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreateWebhookProps) {
    return new Webhook({
      id: IdAdapter.generate(),
      level: props.level,
      value: props.value,
      type: props.type,
      trafficSourceId: props.trafficSourceId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: RestoreWebhookProps) {
    return new Webhook({
      id: props.id,
      level: props.level,
      value: props.value,
      type: props.type,
      trafficSourceId: props.trafficSourceId,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  updateWebhook(input: UpdateWebhookProps) {
    const { value, level } = input;
    if (value) this.value = value;
    if (level) this.level = level;
    this.updatedAt = new Date();
  }

  toJson(userUTC: number) {
    return {
      id: this.id,
      value: this.value,
      level: this.level,
      type: this.type,
      trafficSourceId: this.trafficSourceId,
      createdAt: FormatDateAdapter.format(this.createdAt, userUTC),
      updatedAt: FormatDateAdapter.format(this.updatedAt, userUTC),
    };
  }
}

export { Webhook };
