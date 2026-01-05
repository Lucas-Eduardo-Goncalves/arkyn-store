import { Request } from "../../../domain/entities/request";
import { UserGatewayDTO } from "../../../domain/gateways/user";
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
    private fileStorageService: FileStorageService,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const { body, headers, queryParams } = input;

    const [bodyUrl, user] = await Promise.all([
      this.fileStorageService.insert(body),
      this.userGateway.findUnique(token),
    ]);

    const request = Request.create({
      headers,
      bodyPreview: body,
      bodyUrl,
      queryParams,
    });

    await this.requestRepository.createRequest(request);
    return request.toJson(user.utc);
  }
}

export { CreateRequestUseCase };
