import { DeleteDomainUseCase } from "../../../app/useCases/domain/deleteDomainUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../adapters/httpAdapter";

class DeleteDomainController {
  constructor(private deleteDomainUseCase: DeleteDomainUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);
      const domainId = route.request.params?.domainId;

      if (!domainId) {
        throw HttpAdapter.badRequest("Domain ID is required");
      }

      const domain = await this.deleteDomainUseCase.execute(domainId, token);
      return route.response.json(domain);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteDomainController };
