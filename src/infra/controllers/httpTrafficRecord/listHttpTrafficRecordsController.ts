import { SearchParamsMapper } from "../../../app/shared/searchParamsMapper";
import { ListHttpTrafficRecordsUseCase } from "../../../app/useCases/httpTrafficRecord/listHttpTrafficRecordsUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listHttpTrafficRecordsSchema } from "../../schemas/internal/httpTrafficRecord";

class ListHttpTrafficRecordsController {
  constructor(
    private listHttpTrafficRecordsUseCase: ListHttpTrafficRecordsUseCase
  ) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const searchParams = SearchParamsMapper.toObject({
        query: route.request.query,
        params: route.request.params,
      });

      const schemaValidator = new SchemaValidatorAdapter(
        listHttpTrafficRecordsSchema
      );

      const validatedParams = schemaValidator.validate(searchParams);
      const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

      const httpTrafficRecords =
        await this.listHttpTrafficRecordsUseCase.execute(mappedFilter, token);

      return route.response.json(httpTrafficRecords);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListHttpTrafficRecordsController };
