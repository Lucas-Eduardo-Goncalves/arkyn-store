import { CreateDomainUseCase } from "../../../app/useCases/domain/createDomainUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { createDomainSchema } from "../../schemas/internal/domain";

class CreateDomainController {
  constructor(private createDomainUseCase: CreateDomainUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;
      const schemaValidator = new SchemaValidatorAdapter(createDomainSchema);

      const data = schemaValidator.validate({
        ...route.request.body,
        trafficSourceId,
      });

      const domain = await this.createDomainUseCase.execute(data, token);
      return route.response.json(domain, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { CreateDomainController };
