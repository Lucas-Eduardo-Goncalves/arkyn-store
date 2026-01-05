import { SearchParamsMapper } from "../../../app/shared/searchParamsMapper";
import { ListTrafficSourcesUseCase } from "../../../app/useCases/trafficSource/listTrafficSourcesUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listTrafficSourcesSchema } from "../../schemas/internal/trafficSource";

class ListTrafficSourcesController {
  constructor(private listTrafficSourcesUseCase: ListTrafficSourcesUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const searchParams = SearchParamsMapper.toObject({
        query: route.request.query,
        params: route.request.params,
      });

      const schemaValidator = new SchemaValidatorAdapter(
        listTrafficSourcesSchema
      );

      const validatedParams = schemaValidator.validate(searchParams);

      const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

      const trafficSources = await this.listTrafficSourcesUseCase.execute(
        mappedFilter,
        token
      );

      return route.response.json(trafficSources);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListTrafficSourcesController };
