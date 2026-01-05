import { CreateWebhookUseCase } from "../../../app/useCases/webhook/createWebhookUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { createWebhookSchema } from "../../schemas/internal/webhook";

class CreateWebhookController {
  constructor(private createWebhookUseCase: CreateWebhookUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const body = route.request.body;
      const params = route.request.params;

      const schemaValidator = new SchemaValidatorAdapter(createWebhookSchema);
      const data = schemaValidator.validate({ ...body, ...params });

      const webhook = await this.createWebhookUseCase.execute(data, token);

      return route.response.json(webhook, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { CreateWebhookController };
