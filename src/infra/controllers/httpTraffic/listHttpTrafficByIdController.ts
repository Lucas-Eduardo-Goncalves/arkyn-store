import { ListHttpTrafficByIdUseCase } from "../../../app/useCases/httpTraffic/listHttpTrafficByIdUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../adapters/httpAdapter";

class ListHttpTrafficByIdController {
  constructor(private listHttpTrafficByIdUseCase: ListHttpTrafficByIdUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);

      const httpTrafficId = route.request.params?.httpTrafficId;
      if (!httpTrafficId)
        throw HttpAdapter.badRequest("httpTrafficId param is required");

      const httpTraffics = await this.listHttpTrafficByIdUseCase.execute(
        httpTrafficId,
        token
      );

      return route.response.json(httpTraffics);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListHttpTrafficByIdController };
