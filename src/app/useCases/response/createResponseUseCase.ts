import { Response } from "../../../domain/entities/response";
import { ResponseRepository } from "../../../domain/repositories/response";
import { FileStorageService } from "../../../infra/service/fileStorageService";

type InputProps = {
  headers: string;
  body: string | null;
};

class CreateResponseUseCase {
  constructor(
    private responseRepository: ResponseRepository,
    private fileStorageService: FileStorageService
  ) {}

  getBodyPreview(body: string | null) {
    return body;
    // if (!body) return null;
    // return body.slice(0, 200);
  }

  async execute(input: InputProps) {
    const { body, headers } = input;

    const bodyUrl = await this.fileStorageService.insert(body);
    const bodyPreview = this.getBodyPreview(body);

    const response = Response.create({ headers, bodyUrl, bodyPreview });
    await this.responseRepository.createResponse(response);
    return response.toJson();
  }
}

export { CreateResponseUseCase };
