import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  value: string;
  protocol: "http" | "https";
  trafficSourceId: string;
  createdAt: Date;
};

type CreateDomainProps = {
  value: string;
  protocol: "http" | "https";
  trafficSourceId: string;
};

type RestoreDomainProps = ConstructorProps;

class Domain {
  id: string;
  value: string;
  protocol: "http" | "https";
  trafficSourceId: string;
  createdAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.value = props.value;
    this.protocol = props.protocol;
    this.trafficSourceId = props.trafficSourceId;
    this.createdAt = props.createdAt;
  }

  static create(props: CreateDomainProps) {
    return new Domain({
      id: IdAdapter.generate(),
      value: props.value,
      protocol: props.protocol,
      trafficSourceId: props.trafficSourceId,
      createdAt: new Date(),
    });
  }

  static restore(props: RestoreDomainProps) {
    return new Domain({
      id: props.id,
      value: props.value,
      protocol: props.protocol,
      trafficSourceId: props.trafficSourceId,
      createdAt: props.createdAt,
    });
  }

  toJson(userUTC: number) {
    return {
      id: this.id,
      value: this.value,
      protocol: this.protocol,
      trafficSourceId: this.trafficSourceId,
      createdAt: FormatDateAdapter.format(this.createdAt, userUTC),
    };
  }
}

export { Domain };
