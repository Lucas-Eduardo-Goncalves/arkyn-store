import { CreatePathnameUseCase } from "../../../app/useCases/pathname/createPathnameUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { createPathnameSchema } from "../../schemas/internal/pathname";

class CreatePathnameController {
  constructor(private createPathnameUseCase: CreatePathnameUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const trafficSourceId = route.request.params?.trafficSourceId;
      const domainId = route.request.params?.domainId;
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(createPathnameSchema);

      const data = schemaValidator.validate({
        ...body,
        trafficSourceId,
        domainId,
      });

      const pathname = await this.createPathnameUseCase.execute(data, token);

      return route.response.json(pathname, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { CreatePathnameController };
