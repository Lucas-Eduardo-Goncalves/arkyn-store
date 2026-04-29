import { RejectSharedTrafficSourceInviteUseCase } from "../../../app/useCases/sharedTrafficSource/rejectSharedTrafficSourceInviteUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { rejectSharedTrafficSourceSchema } from "../../schemas/internal/sharedTrafficSource";

class RejectSharedTrafficSourceInviteController {
  constructor(
    private rejectSharedTrafficSourceInviteUseCase: RejectSharedTrafficSourceInviteUseCase,
  ) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);
      const sharedTrafficSourceId = route.request.params?.sharedTrafficSourceId;

      const schemaValidator = new SchemaValidatorAdapter(
        rejectSharedTrafficSourceSchema,
      );
      const validatedBody = schemaValidator.validate({ sharedTrafficSourceId });

      const trafficSource =
        await this.rejectSharedTrafficSourceInviteUseCase.execute(
          validatedBody.sharedTrafficSourceId,
          token,
        );

      return route.response.json(trafficSource);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { RejectSharedTrafficSourceInviteController };
