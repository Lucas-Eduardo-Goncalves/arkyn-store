import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  headers: string;
  bodyPreview: string | null;
  bodyUrl: string | null;
  queryParams: string;
  createdAt: Date;
};

type CreateRequestProps = {
  headers: string;
  bodyPreview: string | null;
  bodyUrl: string | null;
  queryParams: string;
};

type RestoreRequestProps = ConstructorProps;

class Request {
  id: string;
  headers: string;
  bodyPreview: string | null;
  bodyUrl: string | null = null;
  queryParams: string;
  createdAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.headers = props.headers;
    this.bodyPreview = props.bodyPreview;
    this.bodyUrl = props.bodyUrl;
    this.queryParams = props.queryParams;
    this.createdAt = props.createdAt;
  }

  static create(props: CreateRequestProps) {
    return new Request({
      id: IdAdapter.generate(),
      headers: props.headers,
      bodyPreview: props.bodyPreview,
      bodyUrl: props.bodyUrl,
      queryParams: props.queryParams,
      createdAt: new Date(),
    });
  }

  static restore(props: RestoreRequestProps) {
    return new Request({
      id: props.id,
      headers: props.headers,
      bodyPreview: props.bodyPreview,
      bodyUrl: props.bodyUrl,
      queryParams: props.queryParams,
      createdAt: props.createdAt,
    });
  }

  toJson(userUTC: number) {
    return {
      id: this.id,
      headers: this.headers,
      bodyPreview: this.bodyPreview,
      bodyUrl: this.bodyUrl,
      queryParams: this.queryParams,
      createdAt: FormatDateAdapter.format(this.createdAt, userUTC),
    };
  }
}

export { Request };
