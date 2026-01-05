import { SearchParamsMapper } from "../../../app/shared/searchParamsMapper";
import { ListHttpTrafficsUseCase } from "../../../app/useCases/httpTraffic/listHttpTrafficsUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listHttpTrafficsSchema } from "../../schemas/internal/httpTraffic";

class ListHttpTrafficsController {
  constructor(private listHttpTrafficsUseCase: ListHttpTrafficsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const searchParams = SearchParamsMapper.toObject({
        query: route.request.query,
        params: route.request.params,
      });

      const schemaValidator = new SchemaValidatorAdapter(
        listHttpTrafficsSchema
      );

      const validatedParams = schemaValidator.validate(searchParams);
      const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

      const httpTraffics = await this.listHttpTrafficsUseCase.execute(
        mappedFilter,
        token
      );

      return route.response.json(httpTraffics);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListHttpTrafficsController };
