import { CreateTrafficSourceUseCase } from "../../../app/useCases/trafficSource/createTrafficSourceUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { createTrafficSourceSchema } from "../../schemas/internal/trafficSource";

class CreateTrafficSourceController {
  constructor(private createTrafficSourceUseCase: CreateTrafficSourceUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const schemaValidator = new SchemaValidatorAdapter(
        createTrafficSourceSchema
      );

      const data = schemaValidator.validate(route.request.body);

      const trafficSource = await this.createTrafficSourceUseCase.execute(
        data,
        token
      );

      return route.response.json(trafficSource, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { CreateTrafficSourceController };
