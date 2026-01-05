import { UserGatewayDTO } from "../../../domain/gateways/user";
import { CorePathnameRepository } from "../../../domain/repositories/corePathname";
import { CorePathnameSearchParams } from "../../search/corePathnameSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    trafficSourceId: string;
  };
};

class ListCorePathnamesUseCase {
  constructor(
    private corePathnameRepository: CorePathnameRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps, token: string) {
    const searchParams = new CorePathnameSearchParams(input);

    const [corePathnames, user] = await Promise.all([
      this.corePathnameRepository.findAll(searchParams),
      this.userGateway.findUnique(token),
    ]);

    return corePathnames.toJson(user.utc);
  }
}

export { ListCorePathnamesUseCase };
