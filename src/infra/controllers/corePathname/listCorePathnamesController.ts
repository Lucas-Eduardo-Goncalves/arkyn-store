import { SearchParamsMapper } from "../../../app/shared/searchParamsMapper";
import { ListCorePathnamesUseCase } from "../../../app/useCases/corePathname/listCorePathnamesUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listCorePathnamesSchema } from "../../schemas/internal/corePathname";

class ListCorePathnamesController {
  constructor(private listCorePathnamesUseCase: ListCorePathnamesUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const searchParams = SearchParamsMapper.toObject({
        query: route.request.query,
        params: route.request.params,
      });

      const schemaValidator = new SchemaValidatorAdapter(
        listCorePathnamesSchema
      );

      const validatedParams = schemaValidator.validate(searchParams);
      const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

      const corePathnames = await this.listCorePathnamesUseCase.execute(
        mappedFilter,
        token
      );

      return route.response.json(corePathnames);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListCorePathnamesController };
