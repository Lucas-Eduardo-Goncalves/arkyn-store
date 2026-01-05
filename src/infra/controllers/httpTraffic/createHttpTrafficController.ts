import { CreateHttpTrafficUseCase } from "../../../app/useCases/httpTraffic/createHttpTrafficUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { createHttpTrafficSchema } from "../../schemas/internal/httpTraffic";

class CreateHttpTrafficController {
  constructor(private createHttpTrafficUseCase: CreateHttpTrafficUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;
      const schemaValidator = new SchemaValidatorAdapter(
        createHttpTrafficSchema
      );

      const data = schemaValidator.validate({
        ...route.request.body,
        trafficSourceId,
      });

      const httpTraffic = await this.createHttpTrafficUseCase.execute(
        data,
        token
      );
      return route.response.json(httpTraffic, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { CreateHttpTrafficController };
