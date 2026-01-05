import { SearchParamsMapper } from "../../../app/shared/searchParamsMapper";
import { ListPathnamesUseCase } from "../../../app/useCases/pathname/listPathnamesUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listPathnamesSchema } from "../../schemas/internal/pathname";

class ListPathnamesController {
  constructor(private listPathnamesUseCase: ListPathnamesUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const searchParams = SearchParamsMapper.toObject({
        query: route.request.query,
        params: route.request.params,
      });

      const schemaValidator = new SchemaValidatorAdapter(listPathnamesSchema);

      const validatedParams = schemaValidator.validate(searchParams);
      const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

      const pathnames = await this.listPathnamesUseCase.execute(
        mappedFilter,
        token
      );

      return route.response.json(pathnames);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListPathnamesController };
