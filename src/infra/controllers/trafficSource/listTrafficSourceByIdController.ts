import { SearchParamsMapper } from "../../../app/shared/searchParamsMapper";
import { ListTrafficSourceByIdUseCase } from "../../../app/useCases/trafficSource/listTrafficSourceByIdUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listTrafficSourceByIdSchema } from "../../schemas/internal/trafficSource";

class ListTrafficSourceByIdController {
  constructor(
    private listTrafficSourceByIdUseCase: ListTrafficSourceByIdUseCase
  ) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const searchParams = SearchParamsMapper.toObject({
        query: route.request.query,
        params: route.request.params,
      });

      const schemaValidator = new SchemaValidatorAdapter(
        listTrafficSourceByIdSchema
      );

      const validatedParams = schemaValidator.validate({
        ...searchParams,
        token,
      });

      const trafficSources = await this.listTrafficSourceByIdUseCase.execute(
        validatedParams.trafficSourceId,
        token
      );

      return route.response.json(trafficSources);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListTrafficSourceByIdController };
