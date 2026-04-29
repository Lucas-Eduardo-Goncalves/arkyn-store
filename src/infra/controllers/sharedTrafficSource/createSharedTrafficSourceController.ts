import { CreateSharedTrafficSourceUseCase } from "../../../app/useCases/sharedTrafficSource/createSharedTrafficSourceUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { createSharedTrafficSourceSchema } from "../../schemas/internal/sharedTrafficSource";

class CreateSharedTrafficSourceController {
  constructor(
    private createSharedTrafficSourceUseCase: CreateSharedTrafficSourceUseCase,
  ) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const schemaValidator = new SchemaValidatorAdapter(
        createSharedTrafficSourceSchema,
      );

      const data = schemaValidator.validate(route.request.body);

      const trafficSource = await this.createSharedTrafficSourceUseCase.execute(
        data,
        token,
      );

      return route.response.json(trafficSource, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { CreateSharedTrafficSourceController };
