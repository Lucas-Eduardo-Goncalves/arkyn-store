import { UserGatewayDTO } from "../../domain/gateways/user";
import { User } from "../../domain/views/user";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { microAuth } from "../https/microAuth";
import { UserMapper } from "../mappers/user";
import { externalUserSchema } from "../schemas/external/user";

class UserGateway implements UserGatewayDTO {
  async findByEmail(email: string): Promise<User | null> {
    const apiResponse = await microAuth.get("/users/email/:email", {
      urlParams: { email },
    });

    if (!apiResponse.success) throw HttpAdapter.badRequest(apiResponse.message);

    if (!apiResponse.response) return null;

    const schemaValidator = new SchemaValidatorAdapter(externalUserSchema);
    const validatedUser = schemaValidator.validate(apiResponse.response);

    return UserMapper.toEntity(validatedUser);
  }

  async findUnique(token: string): Promise<User> {
    const apiResponse = await microAuth.get("/users/token", { token });

    if (!apiResponse.success) throw HttpAdapter.badRequest(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(externalUserSchema);
    const validatedUser = schemaValidator.validate(apiResponse.response);

    return UserMapper.toEntity(validatedUser);
  }

  async validateUserToken(token: string): Promise<void> {
    const apiResponse = await microAuth.get("/users/validate", { token });
    if (!apiResponse.success) throw HttpAdapter.badRequest(apiResponse.message);
  }
}

export { UserGateway };
