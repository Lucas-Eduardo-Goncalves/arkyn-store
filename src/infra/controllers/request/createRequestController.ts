import { CreateRequestUseCase } from "../../../app/useCases/request/createRequestUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { createRequestSchema } from "../../schemas/internal/request";

class CreateRequestController {
  constructor(private createRequestUseCase: CreateRequestUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const httpTrafficId = route.request.params?.httpTrafficId;
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(createRequestSchema);
      const data = schemaValidator.validate({ ...body, httpTrafficId });

      const request = await this.createRequestUseCase.execute(data, token);
      return route.response.json(request, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { CreateRequestController };
