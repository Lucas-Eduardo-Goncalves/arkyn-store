import { UpdateTrafficSourceUseCase } from "../../../app/useCases/trafficSource/updateTrafficSourceUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { updateTrafficSourceSchema } from "../../schemas/internal/trafficSource";

class UpdateTrafficSourceController {
  constructor(private updateTrafficSourceUseCase: UpdateTrafficSourceUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;

      const schemaValidator = new SchemaValidatorAdapter(
        updateTrafficSourceSchema
      );

      const data = schemaValidator.validate({
        ...route.request.body,
        trafficSourceId,
      });

      const trafficSource = await this.updateTrafficSourceUseCase.execute(
        data,
        token
      );

      return route.response.json(trafficSource, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { UpdateTrafficSourceController };
