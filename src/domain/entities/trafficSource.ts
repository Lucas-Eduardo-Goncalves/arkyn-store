import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  name: string;
  trafficDomain: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateTrafficSourceProps = {
  name: string;
  trafficDomain: string;
  userId: string;
};

type UpdateTrafficSourceProps = {
  name?: string;
  trafficDomain?: string;
};

type RestoreTrafficSourceProps = ConstructorProps;

class TrafficSource {
  id: string;
  name: string;
  trafficDomain: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.trafficDomain = props.trafficDomain;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreateTrafficSourceProps) {
    return new TrafficSource({
      id: IdAdapter.generate(),
      name: props.name,
      trafficDomain: props.trafficDomain,
      userId: props.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: RestoreTrafficSourceProps) {
    return new TrafficSource({
      id: props.id,
      name: props.name,
      trafficDomain: props.trafficDomain,
      userId: props.userId,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  update(props: UpdateTrafficSourceProps) {
    const { name, trafficDomain } = props;
    if (name) this.name = name;
    if (trafficDomain) this.trafficDomain = trafficDomain;
    this.updatedAt = new Date();
  }

  toJson(userUTC: number) {
    return {
      id: this.id,
      name: this.name,
      trafficDomain: this.trafficDomain,
      userId: this.userId,
      createdAt: FormatDateAdapter.format(this.createdAt, userUTC),
      updatedAt: FormatDateAdapter.format(this.updatedAt, userUTC),
    };
  }
}

export { TrafficSource };
