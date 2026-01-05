import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  value: string;
  domainId: string;
  trafficSourceId: string;
  createdAt: Date;
};

type CreatePathnameProps = {
  value: string;
  domainId: string;
  trafficSourceId: string;
};

type RestorePathnameProps = ConstructorProps;

class Pathname {
  id: string;
  value: string;
  domainId: string;
  trafficSourceId: string;
  createdAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.value = props.value;
    this.domainId = props.domainId;
    this.trafficSourceId = props.trafficSourceId;
    this.createdAt = props.createdAt;
  }

  static create(props: CreatePathnameProps) {
    return new Pathname({
      id: IdAdapter.generate(),
      value: props.value,
      domainId: props.domainId,
      trafficSourceId: props.trafficSourceId,
      createdAt: new Date(),
    });
  }

  static restore(props: RestorePathnameProps) {
    return new Pathname({
      id: props.id,
      value: props.value,
      domainId: props.domainId,
      trafficSourceId: props.trafficSourceId,
      createdAt: props.createdAt,
    });
  }

  toJson(userUTC: number) {
    return {
      id: this.id,
      value: this.value,
      domainId: this.domainId,
      trafficSourceId: this.trafficSourceId,
      createdAt: FormatDateAdapter.format(this.createdAt, userUTC),
    };
  }
}

export { Pathname };
