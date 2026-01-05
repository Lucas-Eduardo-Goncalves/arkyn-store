import { ListWebhooksUseCase } from "../../../app/useCases/webhook/listWebhooksUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { listWebhookSchema } from "../../schemas/internal/webhook";

class ListWebhooksController {
  constructor(private listWebhooksUseCase: ListWebhooksUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const schemaValidator = new SchemaValidatorAdapter(listWebhookSchema);
      const data = schemaValidator.validate({ ...route.request.params });

      const webhook = await this.listWebhooksUseCase.execute(data, token);

      return route.response.json(webhook, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListWebhooksController };
