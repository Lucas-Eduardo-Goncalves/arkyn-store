import { SearchParamsMapper } from "../../../app/shared/searchParamsMapper";
import { ListSharedTrafficSourcesUseCase } from "../../../app/useCases/sharedTrafficSource/listSharedTrafficSourcesUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listSharedTrafficSourcesSchema } from "../../schemas/internal/sharedTrafficSource";

class ListSharedTrafficSourcesController {
  constructor(
    private listSharedTrafficSourcesUseCase: ListSharedTrafficSourcesUseCase,
  ) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const searchParams = SearchParamsMapper.toObject({
        query: route.request.query,
        params: route.request.params,
      });

      const schemaValidator = new SchemaValidatorAdapter(
        listSharedTrafficSourcesSchema,
      );

      const validatedParams = schemaValidator.validate(searchParams);

      const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

      const sharedTrafficSources =
        await this.listSharedTrafficSourcesUseCase.execute(mappedFilter, token);

      return route.response.json(sharedTrafficSources);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListSharedTrafficSourcesController };
