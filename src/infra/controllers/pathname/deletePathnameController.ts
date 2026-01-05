import { DeletePathnameUseCase } from "../../../app/useCases/pathname/deletePathnameUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { deletePathnameSchema } from "../../schemas/internal/pathname";

class DeletePathnameController {
  constructor(private deletePathnameUseCase: DeletePathnameUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { token } = await AuthMiddleware.authenticate(route);
      const pathnameId = route.request.params?.pathnameId;

      const schemaValidator = new SchemaValidatorAdapter(deletePathnameSchema);
      const validatedBody = schemaValidator.validate({ pathnameId });

      const pathname = await this.deletePathnameUseCase.execute(
        validatedBody.pathnameId,
        token
      );

      return route.response.json(pathname);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { DeletePathnameController };
