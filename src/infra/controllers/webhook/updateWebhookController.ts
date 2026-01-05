import { UpdateWebhookUseCase } from "../../../app/useCases/webhook/updateWebhookUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { updateWebhookSchema } from "../../schemas/internal/webhook";

class UpdateWebhookController {
  constructor(private updateWebhookUseCase: UpdateWebhookUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const body = route.request.body;
      const params = route.request.params;

      const schemaValidator = new SchemaValidatorAdapter(updateWebhookSchema);
      const data = schemaValidator.validate({ ...body, ...params });

      const webhook = await this.updateWebhookUseCase.execute(data, token);

      return route.response.json(webhook, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { UpdateWebhookController };
