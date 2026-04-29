import { UserGatewayDTO } from "../../../domain/gateways/user";
import { SharedTrafficSourceRepository } from "../../../domain/repositories/sharedTrafficSource";
import { SharedTrafficSourceSearchParams } from "../../search/sharedTrafficSourceSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";
};

class ListSharedTrafficSourcesUseCase {
  constructor(
    private sharedTrafficSourceRepository: SharedTrafficSourceRepository,
    private userGateway: UserGatewayDTO,
  ) {}

  async execute(input: InputProps, token: string) {
    const user = await this.userGateway.findUnique(token);

    const searchParams = new SharedTrafficSourceSearchParams({
      ...input,
      filter: { sharedWithId: user.id },
    });

    const sharedTrafficSources =
      await this.sharedTrafficSourceRepository.findAll(searchParams);

    return sharedTrafficSources.map((t) => t.toJson(user.utc));
  }
}

export { ListSharedTrafficSourcesUseCase };
