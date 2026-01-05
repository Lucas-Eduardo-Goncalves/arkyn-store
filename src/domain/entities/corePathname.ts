import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  value: string;
  trafficSourceId: string;
  createdAt: Date;
};

type CreateCorePathnameProps = {
  value: string;
  trafficSourceId: string;
};

type RestoreCorePathnameProps = ConstructorProps;

class CorePathname {
  id: string;
  value: string;
  trafficSourceId: string;
  createdAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.value = props.value;
    this.trafficSourceId = props.trafficSourceId;
    this.createdAt = props.createdAt;
  }

  static create(props: CreateCorePathnameProps) {
    return new CorePathname({
      id: IdAdapter.generate(),
      value: props.value,
      trafficSourceId: props.trafficSourceId,
      createdAt: new Date(),
    });
  }

  static restore(props: RestoreCorePathnameProps) {
    return new CorePathname({
      id: props.id,
      value: props.value,
      trafficSourceId: props.trafficSourceId,
      createdAt: props.createdAt,
    });
  }

  toJson(userUTC: number) {
    return {
      id: this.id,
      value: this.value,
      trafficSourceId: this.trafficSourceId,
      createdAt: FormatDateAdapter.format(this.createdAt, userUTC),
    };
  }
}

export { CorePathname };
