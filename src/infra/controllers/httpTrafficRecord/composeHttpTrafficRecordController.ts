import { ComposeHttpTrafficRecordUseCase } from "../../../app/useCases/httpTrafficRecord/composeHttpTrafficRecordUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { composeHttpTrafficRecordSchema } from "../../schemas/internal/httpTrafficRecord";

class ComposeHttpTrafficRecordController {
  constructor(
    private composeHttpTrafficRecordUseCase: ComposeHttpTrafficRecordUseCase
  ) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);
      const body = route.request.body;
      const trafficSourceId = route.request.params?.trafficSourceId;

      const schemaValidator = new SchemaValidatorAdapter(
        composeHttpTrafficRecordSchema
      );

      const data = schemaValidator.validate({ ...body, trafficSourceId });
      await this.composeHttpTrafficRecordUseCase.execute(data, token);

      return route.response.json(null, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ComposeHttpTrafficRecordController };
