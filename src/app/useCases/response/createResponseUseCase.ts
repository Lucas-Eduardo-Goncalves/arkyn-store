import { Response } from "../../../domain/entities/response";
import { UserGatewayDTO } from "../../../domain/gateways/user";
import { ResponseRepository } from "../../../domain/repositories/response";
import { FileStorageService } from "../../../infra/service/fileStorageService";

type InputProps = {
  headers: string;
  body: string | null;
};

class CreateResponseUseCase {
  constructor(
    private responseRepository: ResponseRepository,
    private fileStorageService: FileStorageService,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const { body, headers } = input;

    const [bodyUrl, user] = await Promise.all([
      this.fileStorageService.insert(body),
      this.userGateway.findUnique(token),
    ]);

    const response = Response.create({ headers, bodyUrl, bodyPreview: body });

    await this.responseRepository.createResponse(response);
    return response.toJson(user.utc);
  }
}

export { CreateResponseUseCase };
