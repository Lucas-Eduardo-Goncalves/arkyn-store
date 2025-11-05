import { Request } from "../../../domain/entities/request";
import { RequestRepository } from "../../../domain/repositories/request";
import { FileStorageService } from "../../../infra/service/fileStorageService";

type InputProps = {
  headers: string;
  body: string | null;
  queryParams: string;
};

class CreateRequestUseCase {
  constructor(
    private requestRepository: RequestRepository,
    private fileStorageService: FileStorageService
  ) {}

  getBodyPreview(body: string | null) {
    return body;
    // if (!body) return null;
    // return body.slice(0, 200);
  }

  async execute(input: InputProps) {
    const { body, headers, queryParams } = input;

    const bodyUrl = await this.fileStorageService.insert(body);
    const bodyPreview = this.getBodyPreview(body);

    const request = Request.create({
      headers,
      bodyPreview,
      bodyUrl,
      queryParams,
    });

    await this.requestRepository.createRequest(request);
    return request.toJson();
  }
}

export { CreateRequestUseCase };
