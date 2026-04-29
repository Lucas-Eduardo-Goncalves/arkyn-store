import { User } from "../views/user";

type UserGatewayDTO = {
  findByEmail(email: string): Promise<User | null>;
  findUnique(token: string): Promise<User>;
  validateUserToken(token: string): Promise<void>;
};

export { UserGatewayDTO };
