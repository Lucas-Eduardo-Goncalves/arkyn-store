import { AcceptSharedTrafficSourceInviteUseCase } from "../../../app/useCases/sharedTrafficSource/acceptSharedTrafficSourceInviteUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { acceptSharedTrafficSourceSchema } from "../../schemas/internal/sharedTrafficSource";

class AcceptSharedTrafficSourceInviteController {
  constructor(
    private acceptSharedTrafficSourceInviteUseCase: AcceptSharedTrafficSourceInviteUseCase,
  ) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);
      const sharedTrafficSourceId = route.request.params?.sharedTrafficSourceId;

      const schemaValidator = new SchemaValidatorAdapter(
        acceptSharedTrafficSourceSchema,
      );
      const validatedBody = schemaValidator.validate({ sharedTrafficSourceId });

      const trafficSource =
        await this.acceptSharedTrafficSourceInviteUseCase.execute(
          validatedBody.sharedTrafficSourceId,
          token,
        );

      return route.response.json(trafficSource);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { AcceptSharedTrafficSourceInviteController };
