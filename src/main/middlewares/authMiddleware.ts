import { HttpAdapter } from "../../infra/adapters/httpAdapter";
import { microAuth } from "../../infra/https/microAuth";
import { RouteDTO } from "../../main/types/RouteDTO";

class AuthMiddleware {
  static async authenticate(route: RouteDTO): Promise<{ token: string }> {
    const bearerToken = route?.request?.headers?.authorization;
    if (!bearerToken) throw HttpAdapter.badRequest("No token provided");

    const token = bearerToken.replace("Bearer ", "");

    const apiResponse = await microAuth.post(`/users/validate`, { token });
    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    return { token };
  }
}

export { AuthMiddleware };
