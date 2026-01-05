import { CorePathnameRepository } from "../../../domain/repositories/corePathname";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class DeleteCorePathnameUseCase {
  constructor(private corePathnameRepository: CorePathnameRepository) {}

  async execute(corePathnameId: string) {
    const corePathname = await this.corePathnameRepository.findById(
      corePathnameId
    );

    if (!corePathname) {
      throw HttpAdapter.notFound("Core pathname not found");
    }

    await this.corePathnameRepository.deleteCorePathname(corePathname.id);
  }
}

export { DeleteCorePathnameUseCase };
