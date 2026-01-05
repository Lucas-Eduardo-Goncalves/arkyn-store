import { DeleteHttpTrafficUseCase } from "../../../app/useCases/httpTraffic/deleteHttpTrafficUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { deleteHttpTrafficSchema } from "../../schemas/internal/httpTraffic";

class DeleteHttpTrafficController {
  constructor(private deleteHttpTrafficUseCase: DeleteHttpTrafficUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);
      const httpTrafficId = route.request.params?.httpTrafficId;

      const schemaValidator = new SchemaValidatorAdapter(
        deleteHttpTrafficSchema
      );
      const validatedBody = schemaValidator.validate({ httpTrafficId });

      const httpTraffic = await this.deleteHttpTrafficUseCase.execute(
        validatedBody.httpTrafficId,
        token
      );

      return route.response.json(httpTraffic);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteHttpTrafficController };
