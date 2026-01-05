import { DeleteWebhookUseCase } from "../../../app/useCases/webhook/deleteWebhookUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { deleteWebhookSchema } from "../../schemas/internal/webhook";

class DeleteWebhookController {
  constructor(private deleteWebhookUseCase: DeleteWebhookUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const body = route.request.body;
      const params = route.request.params;

      const schemaValidator = new SchemaValidatorAdapter(deleteWebhookSchema);
      const data = schemaValidator.validate({ ...body, ...params });

      const webhook = await this.deleteWebhookUseCase.execute(data, token);

      return route.response.json(webhook, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteWebhookController };
