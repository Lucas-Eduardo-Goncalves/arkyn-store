import { DeleteTrafficSourceUseCase } from "../../../app/useCases/trafficSource/deleteTrafficSourceUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { deleteTrafficSourceSchema } from "../../schemas/internal/trafficSource";

class DeleteTrafficSourceController {
  constructor(private deleteTrafficSourceUseCase: DeleteTrafficSourceUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;

      const schemaValidator = new SchemaValidatorAdapter(
        deleteTrafficSourceSchema
      );
      const validatedBody = schemaValidator.validate({ trafficSourceId });

      const trafficSource = await this.deleteTrafficSourceUseCase.execute(
        validatedBody.trafficSourceId,
        token
      );

      return route.response.json(trafficSource);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteTrafficSourceController };
