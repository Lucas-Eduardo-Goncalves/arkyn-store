import { CreateResponseUseCase } from "../../../app/useCases/response/createResponseUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { createResponseSchema } from "../../schemas/internal/response";

class CreateResponseController {
  constructor(private createResponseUseCase: CreateResponseUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const httpTrafficId = route.request.params?.httpTrafficId;
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(createResponseSchema);
      const data = schemaValidator.validate({ ...body, httpTrafficId });

      const response = await this.createResponseUseCase.execute(data, token);
      return route.response.json(response, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { CreateResponseController };
