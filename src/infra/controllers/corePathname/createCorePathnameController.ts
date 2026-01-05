import { CreateCorePathnameUseCase } from "../../../app/useCases/corePathname/createCorePathnameUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { createCorePathnameSchema } from "../../schemas/internal/corePathname";

class CreateCorePathnameController {
  constructor(private createCorePathnameUseCase: CreateCorePathnameUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const trafficSourceId = route.request.params?.trafficSourceId;
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(
        createCorePathnameSchema
      );

      const data = schemaValidator.validate({ ...body, trafficSourceId });
      const trafficSource = await this.createCorePathnameUseCase.execute(
        data,
        token
      );

      return route.response.json(trafficSource, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { CreateCorePathnameController };
