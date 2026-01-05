import { FormatDateAdapter } from "../../infra/adapters/formatDateAdapter";
import { IdAdapter } from "../../infra/adapters/idAdapter";

type ConstructorProps = {
  id: string;
  headers: string;
  bodyPreview: string | null;
  bodyUrl: string | null;
  createdAt: Date;
};

type CreateResponseProps = {
  headers: string;
  bodyPreview: string | null;
  bodyUrl: string | null;
};

type RestoreResponseProps = ConstructorProps;

class Response {
  id: string;
  headers: string;
  bodyPreview: string | null;
  bodyUrl: string | null;
  createdAt: Date;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.headers = props.headers;
    this.bodyPreview = props.bodyPreview;
    this.bodyUrl = props.bodyUrl;
    this.createdAt = props.createdAt;
  }

  static create(props: CreateResponseProps) {
    return new Response({
      id: IdAdapter.generate(),
      headers: props.headers,
      bodyPreview: props.bodyPreview || null,
      bodyUrl: props.bodyUrl || null,
      createdAt: new Date(),
    });
  }

  static restore(props: RestoreResponseProps) {
    return new Response({
      id: props.id,
      headers: props.headers,
      bodyPreview: props.bodyPreview,
      bodyUrl: props.bodyUrl,
      createdAt: props.createdAt,
    });
  }

  toJson(userUTC: number) {
    return {
      id: this.id,
      headers: this.headers,
      bodyPreview: this.bodyPreview,
      bodyUrl: this.bodyUrl,
      createdAt: FormatDateAdapter.format(this.createdAt, userUTC),
    };
  }
}

export { Response };
