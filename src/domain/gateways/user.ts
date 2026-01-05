import { User } from "../views/user";

type UserGatewayDTO = {
  findUnique(token: string): Promise<User>;
  validateUserToken(token: string): Promise<void>;
};

export { UserGatewayDTO };
