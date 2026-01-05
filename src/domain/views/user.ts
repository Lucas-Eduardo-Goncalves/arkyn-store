import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { Entity } from "../protocol/entity";

type UserRole = "admin" | "user";

type ConstructorProps = {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  utc: number;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

type RestoreUserProps = ConstructorProps;

class User implements Entity {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  utc: number;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.avatarUrl = props.avatarUrl;
    this.email = props.email;
    this.utc = props.utc;
    this.role = props.role;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static restore(props: RestoreUserProps) {
    return new User({
      id: props.id,
      name: props.name,
      avatarUrl: props.avatarUrl,
      email: props.email,
      utc: props.utc,
      role: props.role,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  toJson(userUTC: number) {
    return {
      id: this.id,
      name: this.name,
      avatarUrl: this.avatarUrl,
      email: this.email,
      utc: this.utc,
      role: this.role,
      createdAt: FormatDateAdapter.format(this.createdAt, userUTC),
      updatedAt: FormatDateAdapter.format(this.updatedAt, userUTC),
    };
  }
}

export { User, UserRole };
