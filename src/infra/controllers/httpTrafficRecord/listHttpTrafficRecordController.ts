import { ListHttpTrafficRecordUseCase } from "../../../app/useCases/httpTrafficRecord/listHttpTrafficRecordUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";

class ListHttpTrafficRecordController {
  constructor(
    private listHttpTrafficRecordUseCase: ListHttpTrafficRecordUseCase
  ) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const httpTrafficRecordId = route.request.params?.httpTrafficRecordId;
      if (!httpTrafficRecordId)
        throw new Error("httpTrafficRecordId is required");

      const httpTrafficRecord = await this.listHttpTrafficRecordUseCase.execute(
        httpTrafficRecordId
      );

      return route.response.json(httpTrafficRecord);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListHttpTrafficRecordController };
