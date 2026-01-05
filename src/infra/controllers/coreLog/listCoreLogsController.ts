import { SearchParamsMapper } from "../../../app/shared/searchParamsMapper";
import { ListCoreLogsUseCase } from "../../../app/useCases/coreLog/listCoreLogsUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listCoreLogsSchema } from "../../schemas/internal/coreLog";

class ListCoreLogsController {
  constructor(private listCoreLogsUseCase: ListCoreLogsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const searchParams = SearchParamsMapper.toObject({
        query: route.request.query,
        params: route.request.params,
      });

      const schemaValidator = new SchemaValidatorAdapter(listCoreLogsSchema);

      const validatedParams = schemaValidator.validate(searchParams);
      const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

      const coreLog = await this.listCoreLogsUseCase.execute(
        mappedFilter,
        token
      );

      return route.response.json(coreLog);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListCoreLogsController };
